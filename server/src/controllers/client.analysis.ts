import type { Request, Response } from "express";
import { VenueViewModel } from "../interfaces/analytics-types.js";

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
    }
}