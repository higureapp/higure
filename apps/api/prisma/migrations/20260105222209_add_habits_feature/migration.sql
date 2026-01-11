/*
  Warnings:

  - You are about to drop the column `name` on the `Habit` table. All the data in the column will be lost.
  - The values [daily,weekly] on the enum `Habit_frequency` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `frequencyConfig` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Habit` DROP COLUMN `name`,
    ADD COLUMN `categoryId` VARCHAR(191) NULL,
    ADD COLUMN `dailyRepetitions` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `difficulty` ENUM('EASY', 'NORMAL', 'HARD', 'DEMANDING', 'CHALLENGING') NOT NULL DEFAULT 'NORMAL',
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `frequencyConfig` JSON NOT NULL,
    ADD COLUMN `reminderTime` DATETIME(3) NULL,
    ADD COLUMN `scheduledTime` DATETIME(3) NULL,
    ADD COLUMN `streakCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `frequency` ENUM('SPECIFIC_DAYS_OF_WEEK', 'DAILY', 'SPECIFIC_DAYS_OF_MONTH', 'EVERY_N_DAYS', 'N_TIMES_PER_WEEK') NOT NULL;

-- CreateTable
CREATE TABLE `HabitCategory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `HabitCategory_userId_idx`(`userId`),
    UNIQUE INDEX `HabitCategory_userId_name_key`(`userId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HabitCompletion` (
    `id` VARCHAR(191) NOT NULL,
    `habitId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,

    INDEX `HabitCompletion_habitId_idx`(`habitId`),
    INDEX `HabitCompletion_userId_idx`(`userId`),
    INDEX `HabitCompletion_completedAt_idx`(`completedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Habit_categoryId_idx` ON `Habit`(`categoryId`);

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `HabitCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabitCategory` ADD CONSTRAINT `HabitCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabitCompletion` ADD CONSTRAINT `HabitCompletion_habitId_fkey` FOREIGN KEY (`habitId`) REFERENCES `Habit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabitCompletion` ADD CONSTRAINT `HabitCompletion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
