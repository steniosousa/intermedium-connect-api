import { Module } from '@nestjs/common';
import { CleaningDatabase } from './service/cleaning.database';
import { companyDatabase } from './service/company.database';
import { historyDatabase } from './service/history.database';
import { managerDatabase } from './service/manager.database';
import { objectDatabase } from './service/object.database';
import { UserDatabase } from './service/user.database';
import { PrismaService } from 'config/prisma.service';

@Module({
  providers: [
    companyDatabase,
    managerDatabase,
    UserDatabase,
    PrismaService,
    objectDatabase,
    CleaningDatabase,
    historyDatabase,
  ],

  exports: [
    UserDatabase,
    companyDatabase,
    managerDatabase,
    objectDatabase,
    CleaningDatabase,
    historyDatabase,
  ],
})
export class databaseModule {}
