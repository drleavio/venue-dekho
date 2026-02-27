import { Router } from "express";
import { ClientMiddleware } from "../../middleware/Client.middleware.js";
import { ClientAnalysis } from "../../controllers/client.analysis.js";

const router=Router();


router.get("/analysis",ClientMiddleware,ClientAnalysis.getDashboard)
router.post("/api/add",ClientMiddleware,ClientAnalysis.addVenue)
router.put("/api/update-details",ClientMiddleware,ClientAnalysis.updateVenue)

export default router