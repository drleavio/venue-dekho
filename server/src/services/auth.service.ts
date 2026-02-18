import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import type { User } from "../models/users/userSchema.js"; 

export class AuthService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

  
  static async createUser(userData: any) {
    const { email, password, name } = userData;

    
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    
    const token = this.generateToken({ email, name });

    return { user: { email, name }, token };
  }

 
  static async handleSocialSignup(provider: string, profile: any) {
    // 1. Find or Create user based on provider ID (e.g., googleId or appleId)
    // 2. If new, create record without a password (since it's OAuth)
    // 3. Return user data and a fresh JWT
    const token = this.generateToken({ email: profile.email, id: profile.id });
    return { user: profile, token };
  }

 
  private static generateToken(payload: object): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1d" });
  }
}