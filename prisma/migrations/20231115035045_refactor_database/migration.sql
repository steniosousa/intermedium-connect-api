/*
  Warnings:

  - You are about to drop the column `createAt` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `entrance` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `exit` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `obs1` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `obs2` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `obs3` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Cleaning` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `disableAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `managerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CleaningOfObjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cron` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Cleaning` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('ENTRANCE', 'EXIT', 'OBSERVATION');

-- DropForeignKey
ALTER TABLE "CleaningOfObjects" DROP CONSTRAINT "CleaningOfObjects_cleaningId_fkey";

-- DropForeignKey
ALTER TABLE "CleaningOfObjects" DROP CONSTRAINT "CleaningOfObjects_objectsId_fkey";

-- DropForeignKey
ALTER TABLE "Cron" DROP CONSTRAINT "Cron_userId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_managerId_fkey";

-- DropIndex
DROP INDEX "User_id_key" CASCADE;

-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "createAt",
DROP COLUMN "entrance",
DROP COLUMN "exit",
DROP COLUMN "obs1",
DROP COLUMN "obs2",
DROP COLUMN "obs3",
DROP COLUMN "status",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
DROP COLUMN "createAt",
DROP COLUMN "disableAt",
DROP COLUMN "hashPassword",
DROP COLUMN "managerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "CleaningOfObjects";

-- DropTable
DROP TABLE "Cron";

-- DropTable
DROP TABLE "Manager";

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "cleaningId" TEXT NOT NULL,
    "evidenceUrl" TEXT NOT NULL,
    "type" "EvidenceType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
