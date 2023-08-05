/*
  Warnings:

  - You are about to drop the `CleaningObject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CleaningObject" DROP CONSTRAINT "CleaningObject_cleaningId_fkey";

-- DropForeignKey
ALTER TABLE "CleaningObject" DROP CONSTRAINT "CleaningObject_objectId_fkey";

-- DropTable
DROP TABLE "CleaningObject";

-- CreateTable
CREATE TABLE "CleaningOfObjects" (
    "id" TEXT NOT NULL,
    "cleaningId" TEXT NOT NULL,
    "objectsId" TEXT NOT NULL,

    CONSTRAINT "CleaningOfObjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CleaningOfObjects" ADD CONSTRAINT "CleaningOfObjects_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningOfObjects" ADD CONSTRAINT "CleaningOfObjects_objectsId_fkey" FOREIGN KEY ("objectsId") REFERENCES "Objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
