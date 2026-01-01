-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` ENUM('active', 'disabled', 'deleted') NOT NULL DEFAULT 'active';
