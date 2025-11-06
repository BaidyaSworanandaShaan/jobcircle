import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import jwt from "jsonwebtoken";
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "USER" },
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, accessToken, refreshToken };
};

export const logoutUser = async (refreshToken: string) => {
  if (refreshToken) {
    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null },
    });
  }
};

interface TokenPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as TokenPayload;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid token");
    }

    // 3️⃣ Generate new access token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    return { accessToken, user };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
