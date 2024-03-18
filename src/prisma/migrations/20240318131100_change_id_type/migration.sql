/*
  Warnings:

  - The primary key for the `CodeSubmission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CodeSubmission" DROP CONSTRAINT "CodeSubmission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CodeSubmission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CodeSubmission_id_seq";
