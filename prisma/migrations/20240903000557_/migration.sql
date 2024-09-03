-- CreateTable
CREATE TABLE "userFaceRecognition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "photo" TEXT,
    "descritor" TEXT,

    CONSTRAINT "userFaceRecognition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userFaceRecognition_plate_key" ON "userFaceRecognition"("plate");
