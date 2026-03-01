import jwt from "jsonwebtoken";


export const middleware=async(req:any,res:any,next:any)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        req.user = null;
        return res.status(203).json({success:false,message:"token not available"})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as any;
        req.user=decoded;
        next();
    } catch (error) {
        console.log("token error",error);
        return res.json({success:false,message:"error getting token"})
    }
}