import { z } from 'zod';

// 1. Define the schema
export const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
});

// 2. Automatically generate the TypeScript type
export type User = z.infer<typeof UserSchema>;