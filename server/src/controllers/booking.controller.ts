import { sendNotification } from "../services/notification.services.js";


export const createBooking = async (req: Request, res: Response) => {
    // ... booking logic ...
    
    // After booking is saved:
    await sendNotification((req as any).app.get("io"), {
      recipientId: ownerId,
      senderId: req.user.id,
      type: 'BOOKING_REQUEST',
      content: `New booking request for ${venueName}!`,
      venueId: venueId
    });
  
    res.status(201).json({ success: true });
  };