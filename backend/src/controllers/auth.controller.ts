import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.services";

// Detect production
const isProduction = process.env.NODE_ENV === "production";

// Unified cookie options
const getCookieOptions = (
  overrides: Partial<{
    maxAge: number;
  }> = {}
) => {
  const baseOptions = isProduction
    ? {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        path: "/",
        domain: ".jobcircle.vercel.app",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    : {
        httpOnly: true,
        secure: false,
        sameSite: "lax" as const,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

  return { ...baseOptions, ...overrides };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await registerUser(
      name,
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, getCookieOptions());

    const { password: _pw, refreshToken: _rt, ...safeUser } = user;
    res.json({ user: safeUser, accessToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, getCookieOptions());
    res.cookie("role", user.role, getCookieOptions());

    const { password: _pw, refreshToken: _rt, ...safeUser } = user;
    res.json({ user: safeUser, accessToken });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const { accessToken, user } = await refreshAccessToken(token);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileID: user.profileId,
      role: user.role,
    };

    res.json({ accessToken, user: safeUser });
  } catch (error) {
    console.error("Invalid refresh token:", error);

    // Clear cookies on invalid token
    res.clearCookie("refreshToken", getCookieOptions());
    res.clearCookie("role", getCookieOptions());

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  try {
    if (token) await logoutUser(token);

    // Clear cookies
    res.clearCookie("refreshToken", getCookieOptions());
    res.clearCookie("role", getCookieOptions());

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};
