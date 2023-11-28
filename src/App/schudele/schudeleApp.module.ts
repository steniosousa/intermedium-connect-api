import { Module } from '@nestjs/common';
import { SchudeleAppCotroller } from './controller/schudeleApp.controller';
import { ScheduleAppService } from './service/scheduleApp.service';

@Module({
  controllers: [SchudeleAppCotroller],
  providers: [ScheduleAppService],
})
export class SchudeleAppModule {}
