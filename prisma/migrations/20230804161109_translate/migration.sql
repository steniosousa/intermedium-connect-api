/*
  Warnings:

  - You are about to drop the column `nome` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `administradorId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_administradorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_empresaId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "empresaId",
DROP COLUMN "nome",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "administradorId",
DROP COLUMN "empresaId",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "managerId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
