"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const job_controller_1 = require("../controllers/job.controller");
const router = (0, express_1.Router)();
// Only ADMIN can create jobs
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("ADMIN"), job_controller_1.postJob);
router.get("/", job_controller_1.listJobs);
router.get("/:id", job_controller_1.listSingleJob);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)("ADMIN"), job_controller_1.deleteJob);
exports.default = router;
