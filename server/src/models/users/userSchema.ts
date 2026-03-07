import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcrypt";
import { type User } from '../../interfaces/user-types.js';

export interface IUserDocument extends User, Document {
  password?: string;
  googleId?: string;
  appleId?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userMongooseSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  name: {
    type: String,
    required: true
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
    select: false
  },
  provider: {
    type: String,
    enum: ["local", "google", "apple"],
    default: "local"
  },
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  age: {
    type: Number,
    required: false
  },
  role: {
    type: String,
    enum: ["admin", "user", "guest"],
    default: "user"
  },
  isVerified: { type: Boolean, default: false }
}, {
  timestamps: true
});

userMongooseSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

export const UserModel = model<IUserDocument>('User', userMongooseSchema);
