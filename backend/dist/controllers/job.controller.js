"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.listSingleJob = exports.listJobs = exports.postJob = void 0;
const job_services_1 = require("../services/job.services");
const postJob = async (req, res) => {
    const { title, company, description, location, jobType, skillsRequired, experience, salaryRange, dueDate, } = req.body;
    const userId = req.user.userId;
    try {
        const job = await (0, job_services_1.createJob)({
            title,
            company,
            description,
            location,
            jobType,
            skillsRequired,
            experience,
            salaryRange,
            dueDate: new Date(dueDate),
            userId,
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.postJob = postJob;
const listJobs = async (_req, res) => {
    try {
        const jobs = await (0, job_services_1.getAllJobs)();
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.listJobs = listJobs;
const listSingleJob = async (req, res) => {
    const jobId = parseInt(req.params.id);
    console.log(jobId);
    try {
        const job = await (0, job_services_1.getSingleJob)(jobId);
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.listSingleJob = listSingleJob;
const deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        const result = await (0, job_services_1.deleteJobService)(jobId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error.message === "Invalid job ID") {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === "Job not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deleteJob = deleteJob;
