-- CreateTable
CREATE TABLE "Objects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cleaning" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "where" TEXT NOT NULL,

    CONSTRAINT "Cleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleaningObject" (
    "id" TEXT NOT NULL,
    "cleaningId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,

    CONSTRAINT "CleaningObject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningObject" ADD CONSTRAINT "CleaningObject_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningObject" ADD CONSTRAINT "CleaningObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
