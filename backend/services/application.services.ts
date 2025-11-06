// services/application.service.ts
import prisma from "../lib/prisma";

export const createApplication = async (userId: number, jobId: number) => {
  if (!userId || !jobId) {
    throw new Error("Missing user or job ID");
  }

  // Check if the user has already applied
  const existingApplication = await prisma.application.findUnique({
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
  const application = await prisma.application.create({
    data: {
      userId,
      jobId,
    },
  });

  return application;
};

export const getApplicationsForUser = async (userId: number) => {
  const applications = await prisma.application.findMany({
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

export const getAllApplications = async () => {
  const applications = await prisma.application.findMany({
    orderBy: {
      appliedAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
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

  interface GroupedJob {
    job: {
      id: number;
      title: string;
      company: string;
      location: string;
      jobType: string;
      salaryRange: string | null;
      dueDate: Date;
      experience: string;
    };
    applicants: {
      applicationId: number;
      id: number;
      name: string;
      email: string;
      appliedAt: Date;
      status?: "APPLIED" | "INTERVIEW" | "REJECTED" | "HIRED"; // added status
    }[];
  }

  const grouped = applications.reduce<Record<number, GroupedJob>>(
    (acc, app) => {
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
        status: app.status ?? "APPLIED", // include status, default to "APPLIED"
      });

      return acc;
    },
    {}
  );

  return Object.values(grouped);
};

export const getApplicationsByJobId = async (jobId: number) => {
  const applications = await prisma.application.findMany({
    where: { jobId },
    include: { user: true },
  });

  return applications.map((app) => ({
    id: app.user.id,
    name: app.user.name,
    email: app.user.email,
  }));
};
export const callApplicantForInterview = async (applicationId: number) => {
  if (!applicationId) throw new Error("Application ID is required");
  try {
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status: "INTERVIEW" },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        job: {
          select: { id: true, title: true, company: true },
        },
      },
    });

    return updatedApplication;
  } catch (error) {
    throw error;
  }
};
