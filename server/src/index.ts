import express, { type Request, type Response } from "express"
import authrouter from "./routes/auth/auth.route.js";
import dotenv from 'dotenv';
import publicrouter from "./routes/public/public.route.js"
import protectedrouter from "./routes/protected/analysis.route.js"
import cors from 'cors';
dotenv.config();
import { dbConnect } from "./controllers/db.connect.js";



const port = process.env.PORT || 3000;


const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

app.use("/api/auth",authrouter)
app.use("/api/public",publicrouter)
app.use("/api/protected",protectedrouter)

app.get("/",async(req:Request,res:Response)=>{
    res.send({message:"from server"}).status(200)
})


app.listen(port,async()=>{
    await dbConnect()
    console.log(`running at port ${port}`);
    
})
