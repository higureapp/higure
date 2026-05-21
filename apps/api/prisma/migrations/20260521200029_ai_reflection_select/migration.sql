-- CreateTable
CREATE TABLE `JournalReflection` (
    `id` VARCHAR(191) NOT NULL,
    `journalPageId` VARCHAR(191) NOT NULL,
    `type` ENUM('pragmatic', 'psychological', 'cynical', 'philosophical', 'empathetic', 'stoic', 'romantic', 'critical', 'playful', 'spiritual', 'narrative', 'future_oriented', 'past_oriented', 'social', 'existential', 'mindful', 'ambition_focused', 'contentment_focused', 'shadow_focused', 'integration_focused') NOT NULL,
    `content` TEXT NOT NULL,
    `keyInsights` JSON NOT NULL,
    `suggestedQuestion` VARCHAR(191) NOT NULL,
    `generatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modelVersion` VARCHAR(191) NOT NULL DEFAULT 'gemini-2.5-flash-lite',

    INDEX `JournalReflection_journalPageId_idx`(`journalPageId`),
    INDEX `JournalReflection_type_idx`(`type`),
    UNIQUE INDEX `JournalReflection_journalPageId_type_key`(`journalPageId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JournalReflection` ADD CONSTRAINT `JournalReflection_journalPageId_fkey` FOREIGN KEY (`journalPageId`) REFERENCES `JournalPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
