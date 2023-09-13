/*
  Warnings:

  - You are about to drop the column `where` on the `Cleaning` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Cleaning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cleaning" DROP COLUMN "where",
ADD COLUMN     "placeId" TEXT NOT NULL,
ALTER COLUMN "entrance" DROP NOT NULL,
ALTER COLUMN "entrance" DROP DEFAULT,
ALTER COLUMN "exit" DROP NOT NULL,
ALTER COLUMN "exit" DROP DEFAULT,
ALTER COLUMN "obs1" DROP NOT NULL,
ALTER COLUMN "obs1" DROP DEFAULT,
ALTER COLUMN "obs2" DROP NOT NULL,
ALTER COLUMN "obs2" DROP DEFAULT,
ALTER COLUMN "obs3" DROP NOT NULL,
ALTER COLUMN "obs3" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "deactivatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
