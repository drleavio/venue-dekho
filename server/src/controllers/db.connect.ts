import mongoose from "mongoose";

export const dbConnect = async () => {
    const URL = process.env.MONGO_URL;
    if (!URL) {
        console.error("❌ MONGO_URL is not defined in .env file");
        process.exit(1); 
    }
    try {
        await mongoose.connect(URL);
        console.log("✅ Connected successfully to MongoDB");
    } catch (error) {
        console.error("❌ Error in connect:", error);
        process.exit(1);
    }
};