import { Schema, model, Document } from 'mongoose';
import { z } from 'zod';


export const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
});


export type User = z.infer<typeof UserSchema>;

export interface IUserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userMongooseSchema = new Schema<IUserDocument>({
  username: { 
    type: String, 
    required: true, 
    minlength: 3 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  age: { 
    type: Number 
  },
  role: { 
    type: String, 
    enum: ["admin", "user", "guest"], 
    default: "user" 
  },
}, { 
  timestamps: true 
});

export const UserModel = model<IUserDocument>('User', userMongooseSchema);