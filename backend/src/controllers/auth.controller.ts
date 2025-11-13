import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.services";

// Detect production
const isProduction = process.env.NODE_ENV === "production";

// Type-safe cookie options interface
interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  maxAge?: number;
  domain?: string;
}

// Refresh token cookie options (secure, httpOnly)
const refreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  domain: undefined,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// Role cookie options (readable by frontend)
const roleCookieOptions = (): CookieOptions => ({
  httpOnly: false,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  domain: undefined,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await registerUser(
      name,
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
    res.cookie("role", user.role, roleCookieOptions());

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

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
    res.cookie("role", user.role, roleCookieOptions());

    const { password: _pw, refreshToken: _rt, ...safeUser } = user;
    res.json({ user: safeUser, accessToken });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No token provided" });

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

    res.clearCookie("refreshToken", refreshTokenCookieOptions());
    res.clearCookie("role", roleCookieOptions());

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  try {
    if (token) await logoutUser(token);

    res.clearCookie("refreshToken", refreshTokenCookieOptions());
    res.clearCookie("role", roleCookieOptions());

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};
