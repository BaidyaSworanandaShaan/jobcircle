"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserService = exports.getAllUsersService = exports.completeOrUpdateProfile = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Complete or update user profile
 */
const completeOrUpdateProfile = async (userId, data) => {
    const { profileId, firstName, lastName, phone, address, city, country, bio, dateOfBirth, gender, education, experience, skills, portfolioURL, linkedinURL, githubURL, } = data;
    // Check if profile exists
    let profile;
    if (profileId) {
        // Update existing profile
        profile = await prisma_1.default.profile.update({
            where: { id: profileId },
            data: {
                firstName,
                lastName,
                phone,
                address,
                city,
                country,
                bio,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                gender,
                education,
                experience,
                skills,
                portfolioURL,
                linkedinURL,
                githubURL,
            },
        });
    }
    else {
        // Create new profile
        profile = await prisma_1.default.profile.create({
            data: {
                user: { connect: { id: userId } },
                firstName,
                lastName,
                phone,
                address,
                city,
                country,
                bio,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                gender,
                education,
                experience,
                skills,
                portfolioURL,
                linkedinURL,
                githubURL,
            },
        });
        // Link profile to user
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { profileId: profile.id },
        });
    }
    return profile;
};
exports.completeOrUpdateProfile = completeOrUpdateProfile;
const getAllUsersService = async () => {
    const users = await prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    return users;
};
exports.getAllUsersService = getAllUsersService;
const getCurrentUserService = async (token) => {
    if (!token)
        throw new Error("Not authenticated");
    const payload = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!payload.userId)
        throw new Error("Invalid token");
    const user = await prisma_1.default.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, name: true, email: true, role: true },
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
exports.getCurrentUserService = getCurrentUserService;
