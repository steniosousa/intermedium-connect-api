/*
  Warnings:

  - You are about to drop the column `objectsId` on the `Cleaning` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cleaning" DROP CONSTRAINT "Cleaning_objectsId_fkey";

-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "objectsId";

-- CreateTable
CREATE TABLE "ObjectOfCleaning" (
    "objectId" TEXT NOT NULL,
    "cleaningId" TEXT NOT NULL,

    CONSTRAINT "ObjectOfCleaning_pkey" PRIMARY KEY ("objectId","cleaningId")
);

-- AddForeignKey
ALTER TABLE "ObjectOfCleaning" ADD CONSTRAINT "ObjectOfCleaning_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectOfCleaning" ADD CONSTRAINT "ObjectOfCleaning_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
