/*
  Warnings:

  - Changed the type of `status` on the `Avaliation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusAvaliacao" AS ENUM ('RUIM', 'BOM', 'PERFEITO');

-- DropForeignKey
ALTER TABLE "Avaliation" DROP CONSTRAINT "Avaliation_EpiId_fkey";

-- AlterTable
ALTER TABLE "Avaliation" ALTER COLUMN "EpiId" DROP NOT NULL,
ALTER COLUMN "observation" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusAvaliacao" NOT NULL;

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_EpiId_fkey" FOREIGN KEY ("EpiId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
