/*
  Warnings:

  - You are about to drop the `CleaningObjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Objects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleObject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CleaningObjects" DROP CONSTRAINT "CleaningObjects_cleaningId_fkey";

-- DropForeignKey
ALTER TABLE "CleaningObjects" DROP CONSTRAINT "CleaningObjects_objectId_fkey";

-- DropForeignKey
ALTER TABLE "Objects" DROP CONSTRAINT "Objects_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleObject" DROP CONSTRAINT "ScheduleObject_objectId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleObject" DROP CONSTRAINT "ScheduleObject_scheduleId_fkey";

-- DropTable
DROP TABLE "CleaningObjects";

-- DropTable
DROP TABLE "Objects";

-- DropTable
DROP TABLE "ScheduleObject";
