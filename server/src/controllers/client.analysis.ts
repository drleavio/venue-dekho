import type { Request, Response } from "express";
import { VenueViewModel } from "../interfaces/analytics-types.js";
import { VenueModel, venueZodSchema } from "../interfaces/venue-types.js";

export const ClientAnalysis={
    getDashboard:async(req:Request,res:Response)=>{
        try {
            const venueId = (req as any).user?.venueId; 

            if (!venueId) {
                return res.status(400).json({ 
                    success: false, 
                    message: "No venue associated with this account." 
                });
            }

            const venueData = await VenueViewModel.findById(venueId);

            if (!venueData) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Venue details not found." 
                });
            }

            return res.status(200).json({
                success: true,
                data: venueData
            });
        } catch (error) {
            console.error("Dashboard Error:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error" 
            });
        }
    },
    addVenue: async (req: Request, res: Response) => {
        try {
            const validation = venueZodSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    errors: validation.error?.issues?.map(err => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            const ownerId = (req as any).user?.id; 
            const ownerName = (req as any).user?.name;

            if (!ownerId) {
                return res.status(401).json({ success: false, message: "Unauthorized: No owner found." });
            }

            const newVenue = new VenueModel({
                ...validation.data,
                ownerId,
                ownerName: ownerName || validation.data.ownerName 
            });

            const savedVenue = await newVenue.save();

            return res.status(201).json({
                success: true,
                message: "Venue added successfully!",
                data: savedVenue
            });

        } catch (error: any) {
            console.error("Add Venue Error:", error);
            
            if (error.code === 11000) {
                return res.status(409).json({ success: false, message: "Venue already exists." });
            }

            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    updateVenue: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userId = (req as any).user?.id; 

            const validation = venueZodSchema.partial().safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    errors: validation.error.issues.map(err => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                });
            }

            const venue = await VenueModel.findById(id);

            if (!venue) {
                return res.status(404).json({ success: false, message: "Venue not found." });
            }

            if (venue.ownerId.toString() !== userId) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Unauthorized: You do not own this venue." 
                });
            }

            const updatedVenue = await VenueModel.findByIdAndUpdate(
                id,
                { $set: validation.data },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                message: "Venue updated successfully",
                data: updatedVenue
            });

        } catch (error) {
            console.error("Update Venue Error:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}