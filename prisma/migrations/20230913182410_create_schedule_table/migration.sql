-- CreateTable
CREATE TABLE "Scheduke" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "repeatable" BOOLEAN NOT NULL,

    CONSTRAINT "Scheduke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scheduke" ADD CONSTRAINT "Scheduke_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheduke" ADD CONSTRAINT "Scheduke_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
