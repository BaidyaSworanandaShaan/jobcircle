"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
// lib/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET) {
    throw new Error("Missing required JWT secret environment variables.");
}
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" } // short-lived
    );
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, REFRESH_SECRET, { expiresIn: "7d" } // long-lived
    );
};
exports.generateRefreshToken = generateRefreshToken;
