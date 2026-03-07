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
