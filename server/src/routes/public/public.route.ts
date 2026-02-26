import { Router } from "express";
import { SendVenueDetails } from "../../controllers/venue.details.js";
import { optionalAuth } from "../../middleware/OptionalAuth.js";

const router=Router();


router.get("/venue/:lng/:lat/:radius",optionalAuth,SendVenueDetails.venue)
router.get("/venue/:id",optionalAuth,SendVenueDetails.venueById);