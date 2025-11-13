import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const postEnquiry = async (req: Request, res: Response) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        fullName,
        emailAddress: email,
        subject,
        message,
      },
    });

    return res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Error posting enquiry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
