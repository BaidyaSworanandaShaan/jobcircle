import { Request, Response } from "express";
import prisma from "../lib/prisma";
import {
  completeOrUpdateProfile,
  getAllUsersService,
  getCurrentUserService,
} from "../services/user.services";

export const getUserProfile = async (req: Request, res: Response) => {
  const tokenUserId = (req as any).user.userId; // userId from JWT

  try {
    const userWithProfile = await prisma.user.findUnique({
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getUserProfileViaAdmin = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch user profile including education, experience, skills
    const userProfile = await prisma.user.findUnique({
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
export const completeUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const profileData = req.body;
    console.log(userId);
    console.log(profileData);
    const profile = await completeOrUpdateProfile(userId, profileData);

    return res.status(200).json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user.userId;

    // Count total number of job applications by this user
    const totalApplications = await prisma.application.count({
      where: { userId: tokenUserId },
    });

    // Count total number of jobs available
    const totalJobs = await prisma.job.count();

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
export const getCurrentUserController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;

    const user = await getCurrentUserService(token);
    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(401).json({ message: err.message || "Unauthorized" });
  }
};
