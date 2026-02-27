// models/Notification.ts
import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' }, // e.g., the person who booked
  type: { type: String, enum: ['BOOKING_REQUEST', 'PAYMENT_SUCCESS', 'VENUE_APPROVED'], required: true },
  content: { type: String, required: true },
  venueId: { type: Schema.Types.ObjectId, ref: 'Venue' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export const NotificationModel = model('Notification', notificationSchema);