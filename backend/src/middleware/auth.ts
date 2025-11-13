import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER";
}
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export const authorize =
  (...roles: ("ADMIN" | "USER")[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload;

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
