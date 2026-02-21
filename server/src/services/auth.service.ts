import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, type User } from "../interfaces/user-types.js"; 


export class AuthService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

  static async createUser(userData: User) {
    const { email, password, name, age, role, username,provider } = userData;

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error("User with this email or username already exists");
    }

    // ✅ FIX: Only hash if password exists (for Local Signup)
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword, // Will be undefined for social, which is fine now
      name,
      age,
      role,
      provider
    });

    const token = this.generateToken({ id: user._id, email: user.email });

    return { 
      user: { 
        id: user._id,
        username: user.username,
        email: user.email, 
        name: user.name 
      }, 
      token 
    };
  }

  static async handleSocialSignup(provider: string, profile: any) {
    let user = await UserModel.findOne({ email: profile.email });
    
    if (!user) {
        user = await UserModel.create({
            username: profile.email.split('@')[0], 
            email: profile.email,
            name: profile.name,
            role: "user",
        });
    }

    const token = this.generateToken({ id: user._id, email: user.email });
    return { user, token };
  }

  private static generateToken(payload: object): string {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1d" });
  }
}