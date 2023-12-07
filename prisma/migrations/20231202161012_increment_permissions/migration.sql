-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('OBJECTS', 'PLACES', 'COMPANIES', 'EPIS');

-- CreateTable
CREATE TABLE "PermissionsForUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Permission" "Permissions" NOT NULL,

    CONSTRAINT "PermissionsForUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PermissionsForUsers" ADD CONSTRAINT "PermissionsForUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
