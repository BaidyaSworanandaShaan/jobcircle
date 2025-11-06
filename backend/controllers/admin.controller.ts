import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count({
      where: {
        role: "USER",
      },
    });

    const totalJobs = await prisma.job.count();

    const totalApplications = await prisma.application.count();

    const totalEnquiry = await prisma.enquiry.count();
    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalEnquiry,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
    });
  }
};
