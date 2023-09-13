import { Global, Module } from '@nestjs/common';
import { CleaningDatabase } from './service/cleaning.database';
import { companyDatabase } from './service/company.database';
import { historyDatabase } from './service/history.database';
import { managerDatabase } from './service/manager.database';
import { objectDatabase } from './service/object.database';
import { UserDatabase } from './service/user.database';
import { PrismaService } from 'config/prisma.service';
import { PlaceDatabase } from './service/place.database';
import { CronDatabase } from './service/cron.database';

@Global()
@Module({
  providers: [
    companyDatabase,
    managerDatabase,
    UserDatabase,
    PrismaService,
    objectDatabase,
    CleaningDatabase,
    historyDatabase,
    PlaceDatabase,
    CronDatabase
  ],

  exports: [
    UserDatabase,
    companyDatabase,
    managerDatabase,
    objectDatabase,
    CleaningDatabase,
    historyDatabase,
    PlaceDatabase,
    CronDatabase
  ],
})
export class DatabaseModule {}
