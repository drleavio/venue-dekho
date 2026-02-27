import { Router } from "express";
import { ClientMiddleware } from "../../middleware/Client.middleware.js";
import { ClientAnalysis } from "../../controllers/client.analysis.js";

const router=Router();


router.get("/analysis",ClientMiddleware,ClientAnalysis.getDashboard)

export default router