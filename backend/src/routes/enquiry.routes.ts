import { Router } from "express";
import { getEnquiry, postEnquiry } from "../controllers/enquiry.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.post("/", postEnquiry);
router.get("/", authenticate, authorize("ADMIN"), getEnquiry);

export default router;
