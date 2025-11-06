import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  postJob,
  listJobs,
  listSingleJob,
  deleteJob,
} from "../controllers/job.controller";

const router = Router();

// Only ADMIN can create jobs
router.post("/", authenticate, authorize("ADMIN"), postJob);

router.get("/", listJobs);
router.get("/:id", listSingleJob);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteJob);

export default router;
