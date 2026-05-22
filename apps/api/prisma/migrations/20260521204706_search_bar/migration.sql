-- CreateTable
CREATE TABLE `SearchHistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `query` TEXT NOT NULL,
    `results` JSON NOT NULL,
    `executedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resultCount` INTEGER NOT NULL DEFAULT 0,

    INDEX `SearchHistory_userId_idx`(`userId`),
    INDEX `SearchHistory_executedAt_idx`(`executedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
