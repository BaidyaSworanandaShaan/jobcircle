"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../lib/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (name, email, password) => {
    const existing = await prisma_1.default.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("User already exists");
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: { name, email, password: hashed, role: "USER" },
    });
    const accessToken = (0, jwt_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user);
    await prisma_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return { user, accessToken, refreshToken };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_1.generateRefreshToken)(user);
    await prisma_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return { user, accessToken, refreshToken };
};
exports.loginUser = loginUser;
const logoutUser = async (refreshToken) => {
    if (refreshToken) {
        await prisma_1.default.user.updateMany({
            where: { refreshToken },
            data: { refreshToken: null },
        });
    }
};
exports.logoutUser = logoutUser;
const refreshAccessToken = async (refreshToken) => {
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma_1.default.user.findUnique({
            where: { id: payload.userId },
        });
        if (!user || user.refreshToken !== refreshToken) {
            throw new Error("Invalid token");
        }
        // 3️⃣ Generate new access token
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        return { accessToken, user };
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.refreshAccessToken = refreshAccessToken;
