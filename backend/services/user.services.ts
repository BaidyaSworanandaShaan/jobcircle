import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
}
interface ProfileInput {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  education?: any;
  experience?: any;
  skills?: any;
  portfolioURL?: string;
  linkedinURL?: string;
  githubURL?: string;
  profileId?: number;
}

/**
 * Complete or update user profile
 */
export const completeOrUpdateProfile = async (
  userId: number,
  data: ProfileInput
) => {
  const {
    profileId,
    firstName,
    lastName,
    phone,
    address,
    city,
    country,
    bio,
    dateOfBirth,
    gender,
    education,
    experience,
    skills,
    portfolioURL,
    linkedinURL,
    githubURL,
  } = data;

  // Check if profile exists
  let profile;
  if (profileId) {
    // Update existing profile
    profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        firstName,
        lastName,
        phone,
        address,
        city,
        country,
        bio,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        education,
        experience,
        skills,
        portfolioURL,
        linkedinURL,
        githubURL,
      },
    });
  } else {
    // Create new profile
    profile = await prisma.profile.create({
      data: {
        user: { connect: { id: userId } },
        firstName,
        lastName,
        phone,
        address,
        city,
        country,
        bio,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        education,
        experience,
        skills,
        portfolioURL,
        linkedinURL,
        githubURL,
      },
    });

    // Link profile to user
    await prisma.user.update({
      where: { id: userId },
      data: { profileId: profile.id },
    });
  }

  return profile;
};

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return users;
};
export const getCurrentUserService = async (token: string) => {
  if (!token) throw new Error("Not authenticated");

  const payload = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET!
  ) as TokenPayload;

  if (!payload.userId) throw new Error("Invalid token");

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) throw new Error("User not found");

  return user;
};
