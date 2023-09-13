import { Module } from '@nestjs/common';
import { cleaningModule } from './cleaning/cleaning.module';
import { companyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { historyModel } from './history/history.model';
import { managerModule } from './manager/manager.module';
import { objectModule } from './objects/object.module';
import { userModule } from './user/user.module';
import { placeModule } from 'place/place.module';
import { StartupModule } from 'cron/cron.module';

@Module({
  imports: [
    companyModule,
    managerModule,
    userModule,
    objectModule,
    cleaningModule,
    historyModel,
    placeModule,
    StartupModule,
    DatabaseModule
  ],
  controllers: [],
})
export class AppModule {}
