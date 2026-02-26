// middleware/optionalAuth.ts
import jwt from "jsonwebtoken";
export const optionalAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        req.user = null; // No user, but continue anyway
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded; // Attach user (contains id, role, isPremium, etc.)
        next();
    } catch (err) {
        req.user = null; // Invalid token, treat as public
        next();
    }
};