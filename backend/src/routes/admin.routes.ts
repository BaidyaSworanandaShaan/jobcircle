import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

import { getAdminStats } from "../controllers/admin.controller";

const router = Router();

router.get("/stats", authenticate, authorize("ADMIN"), getAdminStats);

export default router;
