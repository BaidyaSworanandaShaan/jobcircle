"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout =
  exports.refreshToken =
  exports.login =
  exports.register =
    void 0;
const auth_services_1 = require("../services/auth.services");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await (0,
    auth_services_1.registerUser)(name, email, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const { password: _pw, refreshToken: _rt, ...safeUser } = user;
    res.json({ user: safeUser, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.register = register;
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await (0,
    auth_services_1.loginUser)(email, password);
    // Store refresh token in HTTP-only cookie only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
exports.login = login;
const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const { accessToken, user } = await (0, auth_services_1.refreshAccessToken)(
      token
    );
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
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    await (0, auth_services_1.logoutUser)(token);
    // Clear cookie
    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("role", { path: "/" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};
exports.logout = logout;
