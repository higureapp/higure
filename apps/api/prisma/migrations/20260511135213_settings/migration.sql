-- AlterTable
ALTER TABLE `User` ADD COLUMN `language` ENUM('english', 'spanish', 'french', 'italian', 'german') NOT NULL DEFAULT 'english',
    ADD COLUMN `theme` ENUM('dark', 'light') NOT NULL DEFAULT 'light';
