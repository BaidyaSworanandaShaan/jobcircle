/*
  Warnings:

  - You are about to drop the column `coverLetter` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId,userId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `application` DROP COLUMN `coverLetter`,
    DROP COLUMN `email`,
    DROP COLUMN `experience`,
    DROP COLUMN `fullName`,
    DROP COLUMN `phone`,
    DROP COLUMN `portfolio`,
    DROP COLUMN `skills`;

-- AlterTable
ALTER TABLE `profile` MODIFY `bio` LONGTEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Application_jobId_userId_key` ON `Application`(`jobId`, `userId`);
