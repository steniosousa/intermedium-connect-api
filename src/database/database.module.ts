import { Global, Module } from '@nestjs/common';
import { CleaningDatabase } from './service/cleaning.database';
import { companyDatabase } from './service/company.database';
import { UserDatabase } from './service/user.database';
import { PlaceDatabase } from './service/place.database';
import { PrismaService } from './service/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { ManagerDatabase } from './service/manager.database';
import { objectDatabase } from './service/object.database';

@Global()
@Module({
  providers: [
    companyDatabase,
    UserDatabase,
    PrismaService,
    CleaningDatabase,
    PlaceDatabase,
    PrismaUsersRepository,
    ManagerDatabase,
    objectDatabase

  ],
  exports: [
    UserDatabase,
    companyDatabase,
    CleaningDatabase,
    PlaceDatabase,
    PrismaService,
    PrismaUsersRepository,
    ManagerDatabase,
    objectDatabase
  ],
})
export class DatabaseModule { }
