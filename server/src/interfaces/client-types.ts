import { z } from 'zod';

export const clientZodSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),

  businessName: z.string().min(3, "Business name is required").optional(),
  gstNumber: z.string().length(15, "GST must be 15 characters").optional(),
  profilePicture: z.string().url().optional(),

  venueIds: z.array(z.string()).default([]),

  role: z.enum(['admin', 'superadmin']).default('admin'),
  isVerified: z.boolean().default(false),
});

export type ClientDTO = z.infer<typeof clientZodSchema>;