import { Module } from '@nestjs/common';
import { CleaningModule } from './cleaning/cleaning.module';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { HistoryModule } from './history/history.model';
import { ManagerModule } from './manager/manager.module';
import { ObjectModule } from './objects/object.module';
import { UserModule } from './user/user.module';
import { PlaceModule } from 'place/place.module';
import { ScheduleModule as ScheduleModuleConfig } from '@nestjs/schedule';
import { ScheduleModule } from 'schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModuleConfig.forRoot(),
    CompanyModule,
    ManagerModule,
    UserModule,
    ObjectModule,
    CleaningModule,
    HistoryModule,
    PlaceModule,
    DatabaseModule,
    ScheduleModule,
  ],
  controllers: [],
})
export class AppModule {}
