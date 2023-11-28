import { Module } from '@nestjs/common';
import { ListTodayScheduleService } from './services/list-today-schedule.service';
import { ScheduleCleaningService } from './services/schedule-cleaning.service';
import { ScheduleCleaningCron } from './cron/schedule-cleaning.cron';
import CreateScheduleService from './services/create-schedule.service';
import { ScheduleController } from './controller/create-schedule-controller';

@Module({
  providers: [
    ListTodayScheduleService,
    ScheduleCleaningService,
    ScheduleCleaningCron,
    CreateScheduleService,
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
