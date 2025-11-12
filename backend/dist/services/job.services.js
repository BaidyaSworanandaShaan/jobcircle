"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobService = exports.getSingleJob = exports.getAllJobs = exports.createJob = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createJob = async (data) => {
    return prisma_1.default.job.create({
        data: {
            title: data.title,
            description: data.description,
            company: data.company,
            location: data.location,
            jobType: data.jobType,
            skillsRequired: JSON.stringify(data.skillsRequired), // store as JSON
            experience: data.experience,
            salaryRange: data.salaryRange,
            dueDate: data.dueDate,
            userId: data.userId,
        },
    });
};
exports.createJob = createJob;
const getAllJobs = async () => {
    return prisma_1.default.job.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: { postedBy: { select: { id: true, name: true, email: true } } },
    });
};
exports.getAllJobs = getAllJobs;
const getSingleJob = async (id) => {
    return prisma_1.default.job.findUnique({
        where: { id },
        include: { postedBy: { select: { id: true, name: true, email: true } } },
    });
};
exports.getSingleJob = getSingleJob;
const deleteJobService = async (jobId) => {
    // Check if job exists
    const job = await prisma_1.default.job.findUnique({
        where: { id: jobId },
    });
    if (!job) {
        throw new Error("Job not found");
    }
    // Delete the job
    await prisma_1.default.job.delete({
        where: { id: jobId },
    });
    return { message: "Job deleted successfully ✅" };
};
exports.deleteJobService = deleteJobService;
