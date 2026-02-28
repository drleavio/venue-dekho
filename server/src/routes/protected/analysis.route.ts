import { Router } from "express";
import { ClientMiddleware } from "../../middleware/Client.middleware.js";
import { ClientAnalysis } from "../../controllers/client.analysis.js";
import { middleware } from "../../middleware/middleware.js";
import { createBooking } from "../../controllers/booking.controller.js";

const router=Router();


router.get("/analysis",ClientMiddleware,ClientAnalysis.getDashboard)
router.post("/add",ClientMiddleware,ClientAnalysis.addVenue)
router.put("/update-details/:id",ClientMiddleware,ClientAnalysis.updateVenue)
router.post("/book/:id",middleware,createBooking)

export default router