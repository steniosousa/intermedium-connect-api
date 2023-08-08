import { Module } from '@nestjs/common';
import { cleaningModule } from './cleaning/cleaning.module';
import { companyModule } from './company/company.module';
import { databaseModule } from './database/database.module';
import { historyModel } from './history/history.model';
import { managerModule } from './manager/manager.module';
import { objectModule } from './objects/object.module';
import { userModule } from './user/user.module';

@Module({
  imports: [
    companyModule,
    managerModule,
    userModule,
    objectModule,
    cleaningModule,
    historyModel,
  ],
  controllers: [],
  providers: [databaseModule],
})
export class AppModule {}
