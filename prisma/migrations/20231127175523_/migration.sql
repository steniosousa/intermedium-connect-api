/*
  Warnings:

  - You are about to drop the column `EpiId` on the `Avaliation` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Avaliation` table. All the data in the column will be lost.
  - Added the required column `managerId` to the `Avaliation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Avaliation" DROP CONSTRAINT "Avaliation_EpiId_fkey";

-- DropForeignKey
ALTER TABLE "Avaliation" DROP CONSTRAINT "Avaliation_companyId_fkey";

-- AlterTable
ALTER TABLE "Avaliation" DROP COLUMN "EpiId",
DROP COLUMN "companyId",
ADD COLUMN     "managerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "EquipmentsOfAvaliation" (
    "avaliationid" TEXT NOT NULL,
    "equipamentId" TEXT NOT NULL,

    CONSTRAINT "EquipmentsOfAvaliation_pkey" PRIMARY KEY ("avaliationid","equipamentId")
);

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOfAvaliation" ADD CONSTRAINT "EquipmentsOfAvaliation_avaliationid_fkey" FOREIGN KEY ("avaliationid") REFERENCES "Avaliation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOfAvaliation" ADD CONSTRAINT "EquipmentsOfAvaliation_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
