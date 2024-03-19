-- CreateTable
CREATE TABLE "Truck" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coords" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordsForTruck" (
    "truckId" TEXT NOT NULL,
    "coordsId" TEXT NOT NULL,

    CONSTRAINT "coordsForTruck_pkey" PRIMARY KEY ("truckId","coordsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Truck_plate_key" ON "Truck"("plate");

-- AddForeignKey
ALTER TABLE "coordsForTruck" ADD CONSTRAINT "coordsForTruck_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordsForTruck" ADD CONSTRAINT "coordsForTruck_coordsId_fkey" FOREIGN KEY ("coordsId") REFERENCES "Coords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
