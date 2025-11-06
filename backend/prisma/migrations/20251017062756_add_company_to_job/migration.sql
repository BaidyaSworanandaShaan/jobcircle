/*
  Warnings:

  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `company` VARCHAR(191) NOT NULL;
