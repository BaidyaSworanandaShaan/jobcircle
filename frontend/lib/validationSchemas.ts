// lib/validationSchemas.ts
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const contactUsSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  bio: Yup.string()
    .required("Required")
    .min(10, "Bio must be at least 10 characters")
    .max(1000, "Bio must be at most 1000 characters"),
  dateOfBirth: Yup.date().nullable(),
  gender: Yup.string().oneOf(["Male", "Female", "Other", ""], "Invalid gender"),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Required"),
      institution: Yup.string().required("Required"),
      year: Yup.number().required("Required"),
    })
  ),
  experience: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      years: Yup.number().required("Required"),
    })
  ),
  skills: Yup.array().of(Yup.string().required("Required")),
  portfolioURL: Yup.string().url("Must be a valid URL").nullable(),
  linkedinURL: Yup.string().url("Must be a valid URL").nullable(),
  githubURL: Yup.string().url("Must be a valid URL").nullable(),
});

type JobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE";

export const jobAddSchema = Yup.object({
  title: Yup.string().required("Job title is required"),
  company: Yup.string().required("Company is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  jobType: Yup.mixed<JobType>()
    .oneOf(
      ["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE"],
      "Select a valid job type"
    )
    .required("Job type is required"),
  skillsRequired: Yup.array().of(
    Yup.string().required("Skill cannot be empty")
  ),
  experience: Yup.string().required("Experience is required"),
  salaryRange: Yup.string(),
  dueDate: Yup.date().required("Due date is required"),
});
