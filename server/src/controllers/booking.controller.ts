import type { Request, Response } from "express";
import { sendNotification } from "../services/notification.services.js";
import { VenueModel } from "../interfaces/venue-types.js";
import { BookingModel } from "../interfaces/booking-types.js";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { id: venueId } = req.params;
        const { date, guests, paymentMethod } = req.body;
        const userId = (req as any).user.id;

        if (!date || !guests || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required booking details." });
        }

        const venue = await VenueModel.findById(venueId);
        if (!venue) {
            return res.status(404).json({ success: false, message: "Venue not found." });
        }

        const requestedDateStr = new Date(date).toDateString();
        const isAvailable = venue.availabilityDates.some(d => 
            new Date(d).toDateString() === requestedDateStr
        );
        

        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Venue is not available on this date." });
        }

        const totalAmount = venue.pricing?.minFee ?? 
                   venue.pricing?.baseRentalFee ?? 
                   (venue.pricing.foodPricing.vegPerPlate * guests);
        
        //add payment gateway to receive the payment
        const paymentId=""

        const newBooking = await BookingModel.create({
            venueId: venue._id,
            userId: userId,
            clientId: venue.ownerId, 
            eventDate: new Date(date),
            guestCount: guests,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === 'Online' ? 'Paid' : 'Unpaid',
            bookingStatus: paymentMethod==='Online'? 'Confirmed':'Pending',
            transactionId:paymentMethod==='Online'?paymentId:''
        });

        await VenueModel.findByIdAndUpdate(venueId, {
            $pull: { availabilityDates: new Date(date) }
        });

        const io = req.app.get("io");
        await sendNotification(io, {
            recipientId: venue.ownerId.toString(),
            senderId: userId,
            type: 'BOOKING_REQUEST',
            content: `New ${paymentMethod} booking request for ${venue.name} on ${date}.`,
            venueId: venue._id.toString()
        });

        return res.status(201).json({
            success: true,
            message: paymentMethod === 'Cash' 
                ? "Booking requested. Please pay at the location." 
                : "Payment successful. Booking requested.",
            data: newBooking
        });

      } catch (error) {
          console.error("Booking Error:", error);
          return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
};