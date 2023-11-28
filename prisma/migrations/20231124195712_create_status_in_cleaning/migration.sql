-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'ASSUMIDO', 'CONCLUIDO');

-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';
