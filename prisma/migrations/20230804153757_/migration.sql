/*
  Warnings:

  - You are about to drop the column `agenteId` on the `User` table. All the data in the column will be lost.
  - Added the required column `disableAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "agenteId",
ADD COLUMN     "disableAt" TIMESTAMP(3) NOT NULL;
