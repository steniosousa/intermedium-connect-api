-- AlterTable
ALTER TABLE "Cleaning" ADD COLUMN     "cron" TEXT NOT NULL DEFAULT 'Hoje',
ADD COLUMN     "cronHors" TEXT NOT NULL DEFAULT '00';

-- CreateTable
CREATE TABLE "Cron" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cron_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cron" ADD CONSTRAINT "Cron_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
