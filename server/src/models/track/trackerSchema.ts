import { model, Schema } from "mongoose";

const venueViewSchema = new Schema({
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue' },
    viewerId: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional if guest
    device: String,
    timestamp: { type: Date, default: Date.now }
});

export const VenueViewModel = model('VenueView', venueViewSchema);
