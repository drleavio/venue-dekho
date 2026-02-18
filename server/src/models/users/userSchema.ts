import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcrypt";
import { type User } from '../../interfaces/user-types.js';

// 1. Extend the Zod type with database-only fields
export interface IUserDocument extends User, Document {
  password?: string;        // Optional because social logins don't have passwords
  googleId?: string;
  appleId?: string;
  isVerified: boolean;
  comparePassword(password: string): Promise<boolean>;
}

const userMongooseSchema = new Schema<IUserDocument>({
  username: { 
    type: String, 
    required: true, 
    minlength: 3,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    // required: function() { return !this.googleId && !this.appleId; }, // Required ONLY if no social ID
    select: false // Prevents password from being returned in queries by default
  },
  // Added for Social Logins
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  
  role: { 
    type: String, 
    enum: ["admin", "user", "guest"], 
    default: "user" 
  },
  isVerified: { type: Boolean, default: false }
}, { 
  timestamps: true 
});
