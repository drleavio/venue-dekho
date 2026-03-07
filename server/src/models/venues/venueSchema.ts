import { Schema, Types, model, Document } from 'mongoose';
import { type ZodVenue } from '../../interfaces/venue-types.js';

export interface IVenue extends Omit<ZodVenue, 'ownerId'>, Document {
    ownerId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
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
        minFee: {
            type: Number,
            default: 5000
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
