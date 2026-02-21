import express, { type Request, type Response } from "express"
import router from "./routes/auth/auth.route.js";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import { dbConnect } from "./controllers/db.connect.js";



const port = process.env.PORT || 3000;


const app=express();
app.use(express.json());

app.use("/api/auth",router)

app.get("/",async(req:Request,res:Response)=>{
    res.send({message:"from server"}).status(200)
})


app.listen(port,async()=>{
    await dbConnect()
    console.log(`running at port ${port}`);
    
})
