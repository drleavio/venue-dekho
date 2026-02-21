import { Schema, model, Document } from 'mongoose';
import { z } from 'zod';


export const UserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  name: z.string().min(3, "Name must be at least 3 chars"),
  email: z.string().email("Invalid email format"),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
  provider:z.enum(["local", "google", "apple"]),
  
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
  name:{
    type:String,
    required:true
  },
  password:{
    type: String, 
    required: false, 
  },
  provider: {
    type: String,
    enum: ["local", "google", "apple"],
    default: "local"
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  age: { 
    type: Number,
    required:false
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