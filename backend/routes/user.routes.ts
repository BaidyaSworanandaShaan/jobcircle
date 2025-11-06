import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  completeUserProfile,
  getAllUsers,
  getCurrentUserController,
  getUserProfile,
  getUserProfileViaAdmin,
  getUserStats,
} from "../controllers/user.controller";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), getAllUsers);
router.get("/me", getCurrentUserController);
router.get("/profile", authenticate, getUserProfile);
router.get(
  "/:id/admin",
  authenticate,
  authorize("ADMIN"),
  getUserProfileViaAdmin
);
router.post("/profile/complete", authenticate, completeUserProfile);
router.get("/stats", authenticate, getUserStats);

export default router;
