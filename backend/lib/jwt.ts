// lib/jwt.ts
import jwt from "jsonwebtoken";
import { User } from "../generated/prisma";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET) {
  throw new Error("Missing required JWT secret environment variables.");
}
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // short-lived
  );
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    REFRESH_SECRET,
    { expiresIn: "7d" } // long-lived
  );
};
