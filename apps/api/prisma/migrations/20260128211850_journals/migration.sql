-- CreateTable
CREATE TABLE `JournalPage` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `mood` INTEGER NOT NULL DEFAULT 5,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastModified` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `JournalPage_userId_date_idx`(`userId`, `date`),
    INDEX `JournalPage_userId_isActive_idx`(`userId`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalTag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `JournalTag_userId_idx`(`userId`),
    UNIQUE INDEX `JournalTag_userId_name_key`(`userId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalAIAnalysis` (
    `id` VARCHAR(191) NOT NULL,
    `journalPageId` VARCHAR(191) NOT NULL,
    `criticalAnalysis` TEXT NOT NULL,
    `suggestedSongs` JSON NOT NULL,
    `quote` VARCHAR(191) NULL,
    `quoteAuthor` VARCHAR(191) NULL,
    `generatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modelVersion` VARCHAR(191) NOT NULL DEFAULT 'claude-sonnet-4-5',

    UNIQUE INDEX `JournalAIAnalysis_journalPageId_key`(`journalPageId`),
    INDEX `JournalAIAnalysis_journalPageId_idx`(`journalPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalMetrics` (
    `id` VARCHAR(191) NOT NULL,
    `journalPageId` VARCHAR(191) NOT NULL,
    `wordCount` INTEGER NOT NULL,
    `sentenceCount` INTEGER NOT NULL,
    `averageSentenceLength` DOUBLE NOT NULL,
    `paragraphCount` INTEGER NOT NULL,
    `textDensity` DOUBLE NOT NULL,
    `estimatedWritingTime` INTEGER NOT NULL,
    `temporalReferencesCount` INTEGER NOT NULL,
    `temporalFocus` DOUBLE NOT NULL,
    `emotionalValence` DOUBLE NOT NULL,
    `emotionalIntensity` DOUBLE NOT NULL,
    `emotionalVariability` DOUBLE NOT NULL,
    `emotionalWordsCount` INTEGER NOT NULL,
    `introspectionIndex` DOUBLE NOT NULL,
    `questionsCount` INTEGER NOT NULL,
    `causeEffectCount` INTEGER NOT NULL,
    `eventsCount` INTEGER NOT NULL,
    `charactersCount` INTEGER NOT NULL,
    `firstPersonUsage` DOUBLE NOT NULL,
    `narrativeSequentiality` DOUBLE NOT NULL,
    `lexicalRichness` DOUBLE NOT NULL,
    `keyRepetitionsCount` INTEGER NOT NULL,
    `metaphorsCount` INTEGER NOT NULL,
    `formality` DOUBLE NOT NULL,
    `calculatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `JournalMetrics_journalPageId_key`(`journalPageId`),
    INDEX `JournalMetrics_journalPageId_idx`(`journalPageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JournalPageToJournalTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JournalPageToJournalTag_AB_unique`(`A`, `B`),
    INDEX `_JournalPageToJournalTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JournalPage` ADD CONSTRAINT `JournalPage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalTag` ADD CONSTRAINT `JournalTag_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalAIAnalysis` ADD CONSTRAINT `JournalAIAnalysis_journalPageId_fkey` FOREIGN KEY (`journalPageId`) REFERENCES `JournalPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalMetrics` ADD CONSTRAINT `JournalMetrics_journalPageId_fkey` FOREIGN KEY (`journalPageId`) REFERENCES `JournalPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JournalPageToJournalTag` ADD CONSTRAINT `_JournalPageToJournalTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `JournalPage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JournalPageToJournalTag` ADD CONSTRAINT `_JournalPageToJournalTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `JournalTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
