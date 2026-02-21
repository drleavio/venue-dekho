import type { Request, Response } from "express";
import { clientZodSchema } from "../interfaces/client-types.js";




export const LoginController={
    login:async(req:Request,res:Response)=>{
        const body=clientZodSchema.safeParse(req.body);
        if(!body){
            console.log("body not found");
            return res.send({message:"body not found"})
        }
        return res.json({message:"body found",body})
    }
}