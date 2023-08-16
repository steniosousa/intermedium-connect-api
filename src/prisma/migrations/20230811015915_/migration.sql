-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "loginHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disableAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,
    "managerId" TEXT
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

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
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entrance" TEXT NOT NULL DEFAULT '',
    "exit" TEXT NOT NULL DEFAULT '',
    "where" TEXT NOT NULL,

    CONSTRAINT "Cleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleaningOfObjects" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cleaningId" TEXT NOT NULL,
    "objectsId" TEXT NOT NULL,

    CONSTRAINT "CleaningOfObjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginHash_key" ON "User"("loginHash");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objects" ADD CONSTRAINT "Objects_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningOfObjects" ADD CONSTRAINT "CleaningOfObjects_cleaningId_fkey" FOREIGN KEY ("cleaningId") REFERENCES "Cleaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningOfObjects" ADD CONSTRAINT "CleaningOfObjects_objectsId_fkey" FOREIGN KEY ("objectsId") REFERENCES "Objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
