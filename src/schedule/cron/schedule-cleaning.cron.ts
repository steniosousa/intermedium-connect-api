import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'database/service/prisma.service';
import * as dayjs from 'dayjs';
import { ListTodayScheduleService } from 'schedule/services/list-today-schedule.service';

@Injectable()
export class ScheduleCleaningCron {
  constructor(
    private readonly listTodaySchedule: ListTodayScheduleService,
    private readonly prismaService: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  async handle() {
    const schedules = await this.listTodaySchedule.execute();

    for (const schedule of schedules) {
      await this.prismaService.cleaning.create({
        data: {
          userId: schedule.userId,
          placeId: schedule.placeId,
        },
      });

      if (schedule.repeatable) {
        await this.prismaService.schedule.update({
          where: {
            id: schedule.id,
          },
          data: {
            eventDate: dayjs(schedule.eventDate).add(7, 'days').toDate(),
          },
        });
      }
    }
  }
}
