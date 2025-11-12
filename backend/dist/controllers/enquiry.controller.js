"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnquiry = exports.postEnquiry = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const postEnquiry = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newEnquiry = await prisma_1.default.enquiry.create({
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
    }
    catch (error) {
        console.error("Error posting enquiry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.postEnquiry = postEnquiry;
const getEnquiry = async (req, res) => {
    try {
        const enquiries = await prisma_1.default.enquiry.findMany({
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(enquiries);
    }
    catch (error) {
        console.error("Error fetching enquiries:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getEnquiry = getEnquiry;
