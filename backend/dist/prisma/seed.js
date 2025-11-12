"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const existingAdmin = await prisma_1.default.user.findUnique({
        where: { email: email },
    });
    if (!existingAdmin) {
        await prisma_1.default.user.create({
            data: {
                name: "Admin",
                email: email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("Admin user created successfully.");
    }
    else {
        console.log("Admin already exists.");
    }
}
main()
    .catch(console.error)
    .finally(() => prisma_1.default.$disconnect());
