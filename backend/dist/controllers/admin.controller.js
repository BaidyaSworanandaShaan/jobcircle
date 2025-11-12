"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStats = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await prisma_1.default.user.count({
            where: {
                role: "USER",
            },
        });
        const totalJobs = await prisma_1.default.job.count();
        const totalApplications = await prisma_1.default.application.count();
        const totalEnquiry = await prisma_1.default.enquiry.count();
        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalJobs,
                totalApplications,
                totalEnquiry,
            },
        });
    }
    catch (error) {
        console.error("Error fetching admin stats:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin stats",
        });
    }
};
exports.getAdminStats = getAdminStats;
