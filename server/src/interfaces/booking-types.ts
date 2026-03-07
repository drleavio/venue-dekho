import z from "zod";

export const bookingZodSchema = z.object({
  venueId: z.string(),
  userId: z.string(),
  clientId: z.string(),
  eventDate: z.coerce.date(),
  bookingStatus: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Completed']),
  paymentStatus: z.enum(['Unpaid', 'Partially Paid', 'Paid']),
  totalAmount: z.number(),
  advancePaid: z.number().default(0),
  guestCount: z.number(),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(['Cash', 'Online']),
  transactionId: z.string()
});

export type BookingDTO = z.infer<typeof bookingZodSchema>;