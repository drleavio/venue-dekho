import { Schema, Types, model, Document } from 'mongoose';
import { z } from 'zod';

export const venueZodSchema = z.object({
  name: z.string().min(3, "Venue name is required"),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  photos: z.array(z.string().url()).min(1, "At least one photo is required"),
  ownerId: z.string(),
  ownerName: z.string(),
  availabilityDates: z.array(z.coerce.date()),
  capacity: z.object({
    min: z.number(),
    max: z.number(),
  }),
  pricing: z.object({
    minFee:z.number().optional(),
    baseRentalFee: z.number().optional(),
    foodPricing: z.object({
      isMenuAdjustable: z.boolean().default(true),
      platingTypes: z.array(z.enum(['Buffet', 'Sit-down Service', 'Family Style'])),
      vegPerPlate: z.number(),
      nonVegPerPlate: z.number(),
      includedMeals: z.array(z.enum(['Breakfast', 'Lunch', 'High Tea', 'Dinner'])),
    }),
  }),
  amenities: z.array(z.string()),
  policies: z.object({
    cancellation: z.string(),
    alcoholAllowed: z.boolean(),
    outsideCatering: z.boolean(),
  }),
  rating: z.number().min(0).max(5).default(0),
  isActive: z.boolean().default(true),
  analytics: z.object({
    totalViews: z.number().default(0),
    totalBookings: z.number().default(0),
    wishlistCount: z.number().default(0),
  }),
  featured: z.boolean().default(false),
});


type ZodVenue = z.infer<typeof venueZodSchema>;

export interface IVenue extends Omit<ZodVenue, 'ownerId'> {
  ownerId: Types.ObjectId;
}

const venueMongooseSchema = new Schema<IVenue>({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  photos: [{ type: String }],
  ownerId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  ownerName: { type: String, required: true },
  availabilityDates: [{ type: Date }],
  capacity: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  pricing: {
    minFee:{
      type:Number,
      default:5000
    },
    baseRentalFee: { type: Number },
    foodPricing: {
      isMenuAdjustable: { type: Boolean, default: true },
      platingTypes: [{ type: String }],
      vegPerPlate: { type: Number, required: true },
      nonVegPerPlate: { type: Number, required: true },
      includedMeals: [{ type: String }],
    },
  },
  amenities: [{ type: String }],
  policies: {
    cancellation: { type: String, required: true },
    alcoholAllowed: { type: Boolean, default: false },
    outsideCatering: { type: Boolean, default: false }
  },
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  analytics: {
    totalViews: { type: Number, default: 0 },
    totalBookings: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 }
  },
}, { timestamps: true });

export const VenueModel = model<IVenue>('Venue', venueMongooseSchema);