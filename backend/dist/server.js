"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const enquiry_routes_1 = __importDefault(require("./routes/enquiry.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 5000;
// Allow multiple origins
const allowedOrigins = [
    "http://localhost:3000", // local dev
    "https://jobcircle.vercel.app", // production frontend
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/jobs", job_routes_1.default);
app.use("/api/applications", application_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/enquiry", enquiry_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Backend is running!");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
