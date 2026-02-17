const express=require("express")


const app=express();

app.get("/",async(req:any,res:any)=>{
    res.send({message:"from server"}).status(200)
})

app.listen(3000,()=>{
    console.log("running at port 3000");
    
})