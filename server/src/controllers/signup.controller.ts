import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import bcrypt from "bcrypt";

export const SignupController = {
  
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // 1. Check if user exists
      // 2. Hash password: const hashedPassword = await bcrypt.hash(password, 10);
      // 3. Save to DB
      
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },

  signUpWithGoogle: async (req: Request, res: Response) => {
    try {
      const { googleToken } = req.body; 
      // Use google-auth-library to verify the token
      // const ticket = await client.verifyIdToken({ idToken: googleToken, audience: CLIENT_ID });
      
      return res.status(200).json({ message: "Google authentication successful" });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Google token" });
    }
  },

  signUpWithApple: async (req: Request, res: Response) => {
    try {
      const { identityToken, userIdentifier } = req.body;
      // Verify Apple identityToken using 'apple-signin-auth'
      
      return res.status(200).json({ message: "Apple authentication successful" });
    } catch (error) {
      return res.status(401).json({ message: "Invalid Apple token" });
    }
  }
};