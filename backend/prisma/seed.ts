import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingAdmin = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user created successfully.");
  } else {
    console.log("Admin already exists.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
