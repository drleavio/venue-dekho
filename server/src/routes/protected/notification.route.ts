import { Router } from "express";
import { NotificationController } from "../../controllers/notification.controller.js";
import { middleware } from "../../middleware/middleware.js";

const router = Router();

router.get("/", middleware, NotificationController.getNotifications);
router.put("/:id/read", middleware, NotificationController.markAsRead);

export default router;