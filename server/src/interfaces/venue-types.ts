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
    minFee: z.number().optional(),
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
export type ZodVenue = z.infer<typeof venueZodSchema>;