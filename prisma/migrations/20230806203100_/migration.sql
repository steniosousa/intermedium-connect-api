/*
  Warnings:

  - You are about to drop the column `status` on the `CleaningOfObjects` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `CleaningOfObjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendente',
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CleaningOfObjects" DROP COLUMN "status",
DROP COLUMN "updateAt";
