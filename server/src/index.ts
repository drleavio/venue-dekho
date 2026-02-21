import express, { type Request, type Response } from "express"
import router from "./routes/auth/auth.route.js";
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
dotenv.config();
import { dbConnect } from "./controllers/db.connect.js";



const port = process.env.PORT || 3000;


const app=express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies or authorization headers
  }));
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
  });

app.use("/api/auth",router)

app.get("/",async(req:Request,res:Response)=>{
    res.send({message:"from server"}).status(200)
})


app.listen(port,async()=>{
    await dbConnect()
    console.log(`running at port ${port}`);
    
})
