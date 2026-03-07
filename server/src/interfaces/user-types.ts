import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  name: z.string().min(3, "Name must be at least 3 chars"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
  provider: z.enum(["local", "google", "apple"]),

  // Strong Password Validation
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .optional()
});

export type User = z.infer<typeof UserSchema>;