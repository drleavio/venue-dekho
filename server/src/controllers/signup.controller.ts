import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { UserSchema } from "../interfaces/user-types.js";
import { OAuth2Client } from 'google-auth-library';
import axios from "axios";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export const SignupController = {
  
  signUp: async (req: Request, res: Response) => {
    try {
      // 1. Validate data with Zod
      const validation = UserSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validation.error.format() 
        });
      }

      // 2. Extra check for Local Signup (ensure password exists)
      if (!validation.data.password) {
        return res.status(400).json({ message: "Password is required for local signup" });
      }

      const result = await AuthService.createUser(validation.data);
      
      return res.status(201).json({ 
        message: "User created successfully", 
        ...result 
      }); 
    } catch (error: any) {
      console.error("Signup Error:", error.message);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  },

  signUpWithGoogle: async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body; // This is actually the access_token from frontend
      
      // Use the access_token to fetch user info from Google
      const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${idToken}`);
      const payload = googleRes.data;
  
      /* payload will look like: 
         { sub: '123...', name: 'Rahul', email: 'rahul@gmail.com', picture: '...' } 
      */
  
      if (!payload || !payload.email) {
        return res.status(400).json({ message: "Invalid Google Token" });
      }
  
      const result = await AuthService.handleSocialSignup("google", {
        email: payload.email,
        name: payload.name,
        id: payload.sub
      });
  
      return res.status(200).json({ message: "Google authentication successful", ...result });
    } catch (error: any) {
      console.error("Google Auth Error:", error.response?.data || error.message);
      return res.status(401).json({ message: "Invalid Google token" });
    }
  },

  googleCallback: async (req: Request, res: Response) => {
    try {
      const { code } = req.query;
      if (!code) return res.status(400).json({ message: "No code provided" });
      console.log(code,"code");
      
      const { tokens } = await client.getToken(code as string);
      
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID!,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) throw new Error("Google payload missing");

      const googleProfile = {
        email: payload.email,
        name: payload.name || "Google User",
        id: payload.sub,
        picture: payload.picture
      };

      const result = await AuthService.handleSocialSignup("google", googleProfile);
      
      // Usually you redirect to frontend here, but JSON is fine for testing
      return res.status(200).json({ message: "Login successful", ...result });

    } catch (error: any) {
      console.error("Google Auth Error:", error);
      return res.status(500).json({ message: "Auth failed", error: error.message });
    }
  }, // Added missing comma here

  signUpWithApple: async (req: Request, res: Response) => {
    try {
      const { identityToken } = req.body;
      // Logic for Apple verification would go here
      return res.status(200).json({ message: "Apple authentication successful" });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Apple token" });
    }
  }
};