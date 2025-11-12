"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiry_controller_1 = require("../controllers/enquiry.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", enquiry_controller_1.postEnquiry);
router.get("/", auth_1.authenticate, (0, auth_1.authorize)("ADMIN"), enquiry_controller_1.getEnquiry);
exports.default = router;
