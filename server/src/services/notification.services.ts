import { Types } from "mongoose";
import { NotificationModel } from "../interfaces/notifications.js";


export const sendNotification = async (io: any, data: {
  recipientId: string,
  senderId?: string,
  type: 'BOOKING_REQUEST' | 'PAYMENT_SUCCESS' | 'VENUE_APPROVED', // Match your enum exactly
  content: string,
  venueId?: string
}) => {
  try {
    // 1. Create a base object with only required fields
    const notificationData: any = {
      recipient: new Types.ObjectId(data.recipientId),
      type: data.type,
      content: data.content,
    };

    // 2. Only add optional fields if they exist
    if (data.senderId) {
      notificationData.sender = new Types.ObjectId(data.senderId);
    }
    
    if (data.venueId) {
      notificationData.venueId = new Types.ObjectId(data.venueId);
    }

    // 3. Create the notification
    const notification = await NotificationModel.create(notificationData);

    // 4. Push to Socket
    io.to(data.recipientId).emit("new_notification", notification);
    
    return notification;
  } catch (error) {
    console.error("Failed to save notification:", error);
  }
};