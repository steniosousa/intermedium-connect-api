-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "avaliationId" TEXT;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
