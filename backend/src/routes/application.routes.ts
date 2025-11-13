import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  applyForJob,
  callForInterview,
  getApplications,
  getApplicationsForSingleJob,
} from "../controllers/application.controller";

const router = Router();

router.post("/:jobId", authenticate, applyForJob);
router.get(
  "/:jobId",
  authenticate,
  authorize("ADMIN"),
  getApplicationsForSingleJob
);
router.get("/", authenticate, getApplications);
router.patch(
  "/callInterview",
  authenticate,
  authorize("ADMIN"),
  callForInterview
);

export default router;
