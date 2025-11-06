// types.ts
export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE";
  salaryRange?: string;
  dueDate: string; // ISO string
  skillsRequired: JSON;
  experience: string;
  userId: number;
  postedBy: {
    id: number;
    name: string;
    email: string;
  };
  applications: any[]; // or create Application type
  createdAt: string;
  updatedAt: string;
}
