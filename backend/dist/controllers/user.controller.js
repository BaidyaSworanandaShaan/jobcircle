"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserController =
  exports.getUserStats =
  exports.completeUserProfile =
  exports.getUserProfileViaAdmin =
  exports.getAllUsers =
  exports.getUserProfile =
    void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const user_services_1 = require("../services/user.services");
const getUserProfile = async (req, res) => {
  const tokenUserId = req.user.userId; // userId from JWT
  try {
    const userWithProfile = await prisma_1.default.user.findUnique({
      where: { id: Number(tokenUserId) },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true, // include all profile fields
      },
    });
    if (!userWithProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userWithProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getUserProfile = getUserProfile;
const getAllUsers = async (req, res) => {
  try {
    const users = await (0, user_services_1.getAllUsersService)();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.getAllUsers = getAllUsers;
const getUserProfileViaAdmin = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    // Fetch user profile including education, experience, skills
    const userProfile = await prisma_1.default.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            address: true,
            city: true,
            country: true,
            bio: true,
            dateOfBirth: true,
            gender: true,
            education: true,
            experience: true,
            skills: true,
            portfolioURL: true,
            linkedinURL: true,
            githubURL: true,
          },
        },
      },
    });
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error("Error fetching user profile via admin:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getUserProfileViaAdmin = getUserProfileViaAdmin;
const completeUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileData = req.body;
    console.log(userId);
    console.log(profileData);
    const profile = await (0, user_services_1.completeOrUpdateProfile)(
      userId,
      profileData
    );
    return res.status(200).json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
exports.completeUserProfile = completeUserProfile;
const getUserStats = async (req, res) => {
  try {
    const tokenUserId = req.user.userId;
    // Count total number of job applications by this user
    const totalApplications = await prisma_1.default.application.count({
      where: { userId: tokenUserId },
    });
    // Count total number of jobs available
    const totalJobs = await prisma_1.default.job.count();
    return res.status(200).json({
      success: true,
      data: {
        totalApplications,
        totalJobs,
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user stats",
    });
  }
};
exports.getUserStats = getUserStats;
const getCurrentUserController = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    const user = await (0, user_services_1.getCurrentUserService)(token);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err.message || "Unauthorized" });
  }
};
exports.getCurrentUserController = getCurrentUserController;
