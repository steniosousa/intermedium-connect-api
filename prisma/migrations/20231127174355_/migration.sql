/*
  Warnings:

  - Added the required column `observation` to the `Avaliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Avaliation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avaliation" ADD COLUMN     "observation" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
