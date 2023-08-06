-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "evidence_finish" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "evidence_start" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "status" SET DEFAULT 'Pendente';
