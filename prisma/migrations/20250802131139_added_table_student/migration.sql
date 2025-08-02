-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `enrollmentDate` DATETIME(3) NOT NULL,
    `graduationDate` DATETIME(3) NULL,
    `graduationYear` INTEGER NULL,
    `status` ENUM('ENROLLED', 'GRADUATED', 'DROPPED', 'ON_LEAVE') NOT NULL DEFAULT 'ENROLLED',
    `gpa` DOUBLE NULL,
    `thesis` VARCHAR(191) NULL,
    `advisor` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_email_key`(`email`),
    UNIQUE INDEX `students_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
