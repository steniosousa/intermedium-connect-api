/*
  Warnings:

  - You are about to drop the `Scheduke` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Scheduke" DROP CONSTRAINT "Scheduke_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Scheduke" DROP CONSTRAINT "Scheduke_responsibleId_fkey";

-- DropTable
DROP TABLE "Scheduke";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "repeatable" BOOLEAN NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
