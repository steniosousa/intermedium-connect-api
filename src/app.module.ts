import { Module } from '@nestjs/common';
import { CleaningModule } from './cleaning/cleaning.module';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PlaceModule } from 'place/place.module';
import { ScheduleModule as ScheduleModuleConfig } from '@nestjs/schedule';
import { ScheduleModule } from 'schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from 'manager/manager.module';
import { ObjectModule } from 'object/object.module';
import { EpiModule } from 'epi/epi.module';
import { AvaliationModule } from 'avaliation/avaliation.module';
import { emailModule } from 'Email/email.module';
import { historyModule } from 'App/history/history.module';
import { SchudeleAppModule } from 'App/schudele/schudeleApp.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModuleConfig.forRoot(),
    CompanyModule,
    UserModule,
    CleaningModule,
    PlaceModule,
    DatabaseModule,
    ScheduleModule,
    emailModule,
    ManagerModule,
    ObjectModule,
    EpiModule,
    AvaliationModule,
    historyModule,
    SchudeleAppModule
  ],
  controllers: [],
})
export class AppModule { }
