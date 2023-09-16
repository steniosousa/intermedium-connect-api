import { Module } from '@nestjs/common';
import { ListTodayScheduleService } from './services/list-today-schedule.service';
import { ScheduleCleaningService } from './services/schedule-cleaning.service';
import { ScheduleCleaningCron } from './cron/schedule-cleaning.cron';

@Module({
  providers: [
    ListTodayScheduleService,
    ScheduleCleaningService,
    ScheduleCleaningCron,
  ],
})
export class ScheduleModule {}
