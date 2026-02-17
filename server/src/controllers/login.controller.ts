import type { Request, Response } from "express";
import { UserSchema } from "../models/users/userSchema.js";


export const LoginController={
    login:async(req:Request,res:Response)=>{
        const body=UserSchema.safeParse(req.body);
        if(!body){
            console.log("body not found");
            return res.send({message:"body not found"})
        }
        return res.json({message:"body found",body})
    }
}