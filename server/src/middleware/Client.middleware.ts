import jwt from "jsonwebtoken";

export const ClientMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = decoded;
        const allowedRoles = ["admin", "superadmin"];
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({ success: false, message: "Unauthorized role" });
        }

        next();
    } catch (error) {
        req.user = null; 
        return next(); 
    }
};