/*
  Warnings:

  - You are about to drop the column `cron` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `cronHors` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `Cleaning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "cron",
DROP COLUMN "cronHors",
DROP COLUMN "repeat";
