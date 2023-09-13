-- CreateTable
CREATE TABLE "ScheduleObject" (
    "scheduleId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,

    CONSTRAINT "ScheduleObject_pkey" PRIMARY KEY ("scheduleId","objectId")
);

-- AddForeignKey
ALTER TABLE "ScheduleObject" ADD CONSTRAINT "ScheduleObject_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleObject" ADD CONSTRAINT "ScheduleObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
