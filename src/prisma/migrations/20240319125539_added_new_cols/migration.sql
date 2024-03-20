/*
  Warnings:

  - Added the required column `language_id` to the `CodeSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stdOutput` to the `CodeSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submission_id` to the `CodeSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeSubmission" ADD COLUMN     "language_id" INTEGER NOT NULL,
ADD COLUMN     "stdOutput" TEXT NOT NULL,
ADD COLUMN     "submission_id" TEXT NOT NULL;
