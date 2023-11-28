-- CreateTable
CREATE TABLE "Epi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Epi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliation" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "EpiId" TEXT NOT NULL,

    CONSTRAINT "Avaliation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Epi" ADD CONSTRAINT "Epi_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_EpiId_fkey" FOREIGN KEY ("EpiId") REFERENCES "Epi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliation" ADD CONSTRAINT "Avaliation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
