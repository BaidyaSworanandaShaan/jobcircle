"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callForInterview = exports.getApplicationsForSingleJob = exports.getApplications = exports.applyForJob = void 0;
const application_services_1 = require("../services/application.services");
const applyForJob = async (req, res) => {
    const userId = req.user.userId;
    const jobId = parseInt(req.params.jobId);
    try {
        const application = await (0, application_services_1.createApplication)(userId, jobId);
        res.status(201).json(application);
    }
    catch (error) {
        if (error.message === "Already applied") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.applyForJob = applyForJob;
const getApplications = async (req, res) => {
    const user = req.user;
    try {
        const applications = user.role === "ADMIN"
            ? await (0, application_services_1.getAllApplications)()
            : await (0, application_services_1.getApplicationsForUser)(user.userId);
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getApplications = getApplications;
const getApplicationsForSingleJob = async (req, res) => {
    const jobId = Number(req.params.jobId);
    try {
        const applicants = await (0, application_services_1.getApplicationsByJobId)(jobId);
        res.json({ applicants });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getApplicationsForSingleJob = getApplicationsForSingleJob;
const callForInterview = async (req, res) => {
    try {
        const { applicationId } = req.body;
        if (!applicationId)
            return res.status(400).json({ message: "Application ID is required" });
        const updatedApplication = await (0, application_services_1.callApplicantForInterview)(applicationId);
        res.status(200).json({
            applicationId: updatedApplication.id,
            status: updatedApplication.status,
            user: updatedApplication.user,
            job: updatedApplication.job,
            appliedAt: updatedApplication.appliedAt,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: error.message || "Failed to update application" });
    }
};
exports.callForInterview = callForInterview;
