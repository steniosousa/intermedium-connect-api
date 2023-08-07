/*
  Warnings:

  - You are about to drop the column `evidence_finish` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `evidence_start` on the `Cleaning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "evidence_finish",
DROP COLUMN "evidence_start",
ADD COLUMN     "entrance" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "exit" TEXT NOT NULL DEFAULT '';
