/*
  Warnings:

  - You are about to drop the column `count` on the `Cleaning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "count",
ADD COLUMN     "repeat" BOOLEAN NOT NULL DEFAULT false;
