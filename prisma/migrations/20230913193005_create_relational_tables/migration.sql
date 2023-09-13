-- CreateTable
CREATE TABLE "CleaningObjects" (
    "cleaningId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,

    CONSTRAINT "CleaningObjects_pkey" PRIMARY KEY ("cleaningId","objectId")
);

-- AddForeignKey
ALTER TABLE "CleaningObjects" ADD CONSTRAINT "CleaningObjects_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningObjects" ADD CONSTRAINT "CleaningObjects_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
