import { Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class ListTodayScheduleService {
  constructor(private readonly prismaService: PrismaService) {}
  async execute() {
    console.log('start')

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
        deactivatedAt:{not:null}
      },
      include: {
        objects: true,
      },
    });

    return schedules;
  }
}
