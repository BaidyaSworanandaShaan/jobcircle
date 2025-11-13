import prisma from "../lib/prisma";
interface JobInput {
  title: string;
  description: string;
  location: string;
  company: string;
  jobType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE";
  skillsRequired: string[]; // Array of skills
  experience: string;
  salaryRange?: string;
  dueDate: Date;
  userId: number;
}
export const createJob = async (data: JobInput) => {
  return prisma.job.create({
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
export const getAllJobs = async () => {
  return prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { postedBy: { select: { id: true, name: true, email: true } } },
  });
};
export const getSingleJob = async (id: number) => {
  return prisma.job.findUnique({
    where: { id },
    include: { postedBy: { select: { id: true, name: true, email: true } } },
  });
};

export const deleteJobService = async (jobId: number) => {
  // Check if job exists
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // Delete the job
  await prisma.job.delete({
    where: { id: jobId },
  });

  return { message: "Job deleted successfully ✅" };
};
