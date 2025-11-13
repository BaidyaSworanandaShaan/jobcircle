"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const auth_services_1 = require("../services/auth.services");
// Detect production
const isProduction = process.env.NODE_ENV === "production";
// Refresh token cookie options (secure, httpOnly)
const refreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
// Role cookie options (readable by frontend)
const roleCookieOptions = () => ({
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { user, accessToken, refreshToken } = await (0, auth_services_1.registerUser)(name, email, password);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
        res.cookie("role", user.role, roleCookieOptions());
        const { password: _pw, refreshToken: _rt, ...safeUser } = user;
        res.json({ user: safeUser, accessToken });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await (0, auth_services_1.loginUser)(email, password);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
        res.cookie("role", user.role, roleCookieOptions());
        const { password: _pw, refreshToken: _rt, ...safeUser } = user;
        res.json({ user: safeUser, accessToken });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const { accessToken, user } = await (0, auth_services_1.refreshAccessToken)(token);
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            profileID: user.profileId,
            role: user.role,
        };
        res.json({ accessToken, user: safeUser });
    }
    catch (error) {
        console.error("Invalid refresh token:", error);
        res.clearCookie("refreshToken", refreshTokenCookieOptions());
        res.clearCookie("role", roleCookieOptions());
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    try {
        if (token)
            await (0, auth_services_1.logoutUser)(token);
        res.clearCookie("refreshToken", refreshTokenCookieOptions());
        res.clearCookie("role", roleCookieOptions());
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to logout" });
    }
};
exports.logout = logout;
