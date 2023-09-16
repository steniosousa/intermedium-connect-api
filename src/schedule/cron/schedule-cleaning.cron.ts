import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'config/prisma.service';
import * as dayjs from 'dayjs';
import { ListTodayScheduleService } from 'schedule/services/list-today-schedule.service';

@Injectable()
export class ScheduleCleaningCron {
  constructor(
    private readonly listTodaySchedule: ListTodayScheduleService,
    private readonly prismaService: PrismaService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handle() {
    const schedules = await this.listTodaySchedule.execute();
    for (const schedule of schedules) {
      await this.prismaService.cleaning.create({
        data: {
          userId: schedule.responsibleId,
          placeId: schedule.placeId,
          CleaningObjects: {
            createMany: {
              data: schedule.objects.map((obj) => ({
                objectId: obj.objectId,
              })),
            },
          },
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
