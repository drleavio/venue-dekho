import type { Request, Response } from "express";
import { NotificationModel } from "../interfaces/notifications.js";

export const NotificationController = {
    getNotifications: async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const notifications = await NotificationModel.find({ recipient: userId })
                .sort({ createdAt: -1 });
            
            return res.status(200).json({ success: true, data: notifications });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error fetching notifications" });
        }
    },

    markAsRead: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await NotificationModel.findByIdAndUpdate(id, { read: true });
            return res.status(200).json({ success: true, message: "Notification read" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error updating notification" });
        }
    }
};