import express, { type Request, type Response } from "express"
import router from "./routes/auth/auth.route.js";


const app=express();
app.use(express.json());

app.use("/api/auth",router)

app.get("/",async(req:Request,res:Response)=>{
    res.send({message:"from server"}).status(200)
})


app.listen(3000,()=>{
    console.log("running at port 3000");
    
})
