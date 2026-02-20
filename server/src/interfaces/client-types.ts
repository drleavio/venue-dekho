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


import { Schema, model, Types, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  businessName?: string;
  gstNumber?: string;
  profilePicture?: string;
  venueIds: Types.ObjectId[]; 
  role: 'admin' | 'superadmin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const clientMongooseSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, 
  phoneNumber: { type: String, required: true },
  businessName: { type: String },
  gstNumber: { type: String },
  profilePicture: { type: String },
  venueIds: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Venue' 
  }],
  role: { 
    type: String, 
    enum: ['admin', 'superadmin'], 
    default: 'admin' 
  },
  isVerified: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

export const ClientModel = model<IClient>('Client', clientMongooseSchema);