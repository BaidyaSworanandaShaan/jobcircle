import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.services";
import prisma from "../lib/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await registerUser(
      name,
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

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

    // Store refresh token in HTTP-only cookie only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

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

    // 🚪 Clear cookie to logout user
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  try {
    await logoutUser(token);

    // Clear cookie
    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("role", { path: "/" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};
