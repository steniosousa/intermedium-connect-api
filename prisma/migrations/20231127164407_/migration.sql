/*
  Warnings:

  - You are about to drop the `Epi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avaliation" DROP CONSTRAINT "Avaliation_EpiId_fkey";

-- DropForeignKey
ALTER TABLE "Epi" DROP CONSTRAINT "Epi_companyId_fkey";

-- DropTable
DROP TABLE "Epi";

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_EpiId_fkey" FOREIGN KEY ("EpiId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
