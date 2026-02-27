import type { Request, Response } from "express";
import { VenueModel } from "../interfaces/venue-types.js";


export const SendVenueDetails = {
    venue: async (req: Request, res: Response) => {
        try {
            const { lng, lat, radius } = req.params;
            const { search, page = "1", limit = "20" } = req.query;
    
            if (!lng || !lat || !radius) {
                return res.status(400).json({ success: false, message: "Missing coordinates or radius." });
            }
    
            const pageNum = parseInt(page as string);
            const limitNum = parseInt(limit as string);
            const skip = (pageNum - 1) * limitNum;
            const isAuthenticated = !!(req as any).user;
    
            const query: any = {
                "address.coordinates": { 
                    $nearSphere: {
                        $geometry: { 
                            type: "Point", 
                            coordinates: [parseFloat(lng as string), parseFloat(lat as string)] 
                        },
                        $maxDistance: parseFloat(radius as string),
                    },
                },
            };
    
            if (search) {
                query.name = { $regex: search, $options: "i" };
            }
    
            const [venues, totalVenues] = await Promise.all([
                VenueModel.find(query).skip(skip).limit(limitNum).lean(),
                VenueModel.countDocuments(query)
            ]);
    
            const transformedData = venues.map(venue => {
                const { ownerId, ownerName, availabilityDates, ...publicData } = venue;
                
                return isAuthenticated 
                    ? { ...venue } 
                    : publicData;  
            });
    
            const hasMore = skip + venues.length < totalVenues;
    
            return res.status(200).json({
                success: true,
                total: totalVenues,
                page: pageNum,
                limit: limitNum,
                hasMore,
                data: transformedData,
            });
    
        } catch (error) {
            console.error("Error fetching venues:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    venueById:async(req:Request,res:Response)=>{
        try {
        const {id}=req.params
        const response=await VenueModel.findById(id);
        return res.status(200).json({
            success:true,
            data:response
        })
        } catch (error) {
            console.error("Error fetching venues:", error);
            return res.status(500).json({success:false, message: "Internal Server Error" });
        }
    },
}