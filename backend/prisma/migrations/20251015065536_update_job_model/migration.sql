/*
  Warnings:

  - Added the required column `dueDate` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillsRequired` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `dueDate` DATETIME(3) NOT NULL,
    ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobType` ENUM('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'REMOTE') NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `salaryRange` VARCHAR(191) NULL,
    ADD COLUMN `skillsRequired` JSON NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
