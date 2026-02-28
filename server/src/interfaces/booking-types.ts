import { model, Schema, type Types } from "mongoose";
import z from "zod";

export const bookingZodSchema = z.object({
    venueId: z.string(),
    userId: z.string(),
    clientId:z.string(),
    eventDate: z.coerce.date(),
    bookingStatus: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Completed']),
    paymentStatus: z.enum(['Unpaid', 'Partially Paid', 'Paid']),
    totalAmount: z.number(),
    advancePaid: z.number().default(0),
    guestCount: z.number(),
    specialRequests: z.string().optional(),
    paymentMethod:z.enum(['Cash', 'Online']),
    transactionId:z.string()
  });
  
  export interface IBooking extends Document {
    venueId: Types.ObjectId;
    userId: Types.ObjectId;
    clientId:Types.ObjectId;
    eventDate: Date;
    bookingStatus: string;
    paymentStatus: string;
    totalAmount: number;
    advancePaid: number;
    guestCount: number;
    paymentMethod:string;
    transactionId:string;
  }
  
  const bookingSchema = new Schema<IBooking>({
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    eventDate: { type: Date, required: true },
    bookingStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Unpaid', 'Partially Paid', 'Paid'], default: 'Unpaid' },
    totalAmount: { type: Number, required: true },
    advancePaid: { type: Number, default: 0 },
    guestCount: { type: Number, required: true },
    paymentMethod: { 
      type: String, 
      enum: ['Cash', 'Online'], 
      required: true 
    },
    transactionId: { 
      type: String, 
      unique: true, 
      sparse: true 
  },
  }, { timestamps: true });
  
  export const BookingModel = model<IBooking>('Booking', bookingSchema);