import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/service/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ListTodayScheduleService {
  constructor(private readonly prismaService: PrismaService) {}
  async execute() {
    const currentDate = dayjs();

    const schedules = await this.prismaService.schedule.findMany({
      where: {
        eventDate: {
          gte: currentDate.hour(0).minute(0).second(0).millisecond(0).toDate(),
          lte: currentDate
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(0)
            .toDate(),
        },
      },
    });

    return schedules;
  }
}
