/*
  Warnings:

  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `application` ADD COLUMN `coverLetter` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `portfolio` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NOT NULL;
