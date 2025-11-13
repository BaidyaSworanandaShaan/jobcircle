import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes";
import jobRoutes from "./src/routes/job.routes";
import applicationRoutes from "./src/routes/application.routes";
import userRoutes from "./src/routes/user.routes";
import enquiryRoutes from "./src/routes/enquiry.routes";
import adminRoutes from "./src/routes/admin.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// Allow multiple origins
const allowedOrigins = (
  process.env.FRONTEND_URLS ||
  "http://localhost:3000,https://jobcircle.vercel.app"
).split(","); // split CSV list

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
