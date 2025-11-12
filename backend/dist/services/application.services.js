"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callApplicantForInterview = exports.getApplicationsByJobId = exports.getAllApplications = exports.getApplicationsForUser = exports.createApplication = void 0;
// services/application.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
const createApplication = async (userId, jobId) => {
    if (!userId || !jobId) {
        throw new Error("Missing user or job ID");
    }
    // Check if user has already applied
    const existingApplication = await prisma_1.default.application.findUnique({
        where: {
            jobId_userId: {
                jobId,
                userId,
            },
        },
    });
    if (existingApplication) {
        throw new Error("Already applied");
    }
    // Create a new application
    const application = await prisma_1.default.application.create({
        data: { userId, jobId },
    });
    return application;
};
exports.createApplication = createApplication;
const getApplicationsForUser = async (userId) => {
    const applications = await prisma_1.default.application.findMany({
        where: { userId },
        include: {
            job: {
                select: {
                    id: true,
                    title: true,
                    company: true,
                    location: true,
                    jobType: true,
                    salaryRange: true,
                    dueDate: true,
                    experience: true,
                },
            },
        },
        orderBy: { appliedAt: "desc" },
    });
    return applications.map((app) => ({
        applicationId: app.id,
        job: app.job,
        appliedAt: app.appliedAt,
        status: app.status ?? "APPLIED",
    }));
};
exports.getApplicationsForUser = getApplicationsForUser;
const getAllApplications = async () => {
    const applications = await prisma_1.default.application.findMany({
        orderBy: { appliedAt: "desc" },
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
            job: {
                select: {
                    id: true,
                    title: true,
                    company: true,
                    location: true,
                    jobType: true,
                    salaryRange: true,
                    dueDate: true,
                    experience: true,
                },
            },
        },
    });
    const grouped = applications.reduce((acc, app) => {
        const jobId = app.job.id;
        if (!acc[jobId]) {
            acc[jobId] = {
                job: app.job,
                applicants: [],
            };
        }
        acc[jobId].applicants.push({
            applicationId: app.id,
            id: app.user.id,
            name: app.user.name,
            email: app.user.email,
            appliedAt: app.appliedAt,
            status: app.status ?? "APPLIED",
        });
        return acc;
    }, {});
    return Object.values(grouped);
};
exports.getAllApplications = getAllApplications;
const getApplicationsByJobId = async (jobId) => {
    const applications = await prisma_1.default.application.findMany({
        where: { jobId },
        include: { user: true },
    });
    return applications.map((app) => ({
        id: app.user.id,
        name: app.user.name,
        email: app.user.email,
    }));
};
exports.getApplicationsByJobId = getApplicationsByJobId;
const callApplicantForInterview = async (applicationId) => {
    if (!applicationId)
        throw new Error("Application ID is required");
    try {
        const updatedApplication = await prisma_1.default.application.update({
            where: { id: applicationId },
            data: { status: "INTERVIEW" },
            include: {
                user: { select: { id: true, name: true, email: true } },
                job: { select: { id: true, title: true, company: true } },
            },
        });
        return updatedApplication;
    }
    catch (error) {
        throw error;
    }
};
exports.callApplicantForInterview = callApplicantForInterview;
