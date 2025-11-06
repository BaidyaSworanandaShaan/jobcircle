export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  years: string;
}
export interface Application {
  applicationId: number;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    jobType: string;
    salaryRange?: string | null;
    dueDate: string;
    experience: string;
  };
  appliedAt: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "HIRED";
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  bio: string;
  dateOfBirth: string; // ISO string
  gender: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  portfolioURL: string;
  linkedinURL: string;
  githubURL: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: Profile;
}
