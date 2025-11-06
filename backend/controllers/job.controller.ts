// controllers/job.controller.ts
import { Request, Response } from "express";
import {
  createJob,
  deleteJobService,
  getAllJobs,
  getSingleJob,
} from "../services/job.services";

export const postJob = async (req: Request, res: Response) => {
  const {
    title,
    company,
    description,
    location,
    jobType,
    skillsRequired,
    experience,
    salaryRange,
    dueDate,
  } = req.body;
  const userId = (req as any).user.userId;

  try {
    const job = await createJob({
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const listJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const listSingleJob = async (req: Request, res: Response) => {
  const jobId = parseInt(req.params.id);
  console.log(jobId);
  try {
    const job = await getSingleJob(jobId);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = parseInt(req.params.id);

    const result = await deleteJobService(jobId);

    res.status(200).json(result);
  } catch (error: any) {
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
