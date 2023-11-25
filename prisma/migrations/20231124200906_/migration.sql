/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "responsibleId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
