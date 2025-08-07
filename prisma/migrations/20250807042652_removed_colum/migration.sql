/*
  Warnings:

  - You are about to drop the column `advisor` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentDate` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `thesis` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `advisor`,
    DROP COLUMN `enrollmentDate`,
    DROP COLUMN `status`,
    DROP COLUMN `thesis`;
