/*
  Warnings:

  - Added the required column `objectsId` to the `Cleaning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "objectsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Object" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_objectsId_fkey" FOREIGN KEY ("objectsId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
