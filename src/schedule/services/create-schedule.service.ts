import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/service/prisma.service';

@Injectable()
export default class CreateScheduleService {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data) {
    await this.Prisma.schedule.create({
      data: {
        placeId: data.placeId,
        eventDate: data.eventDate,
        repeatable: data.repeatable,
        responsibleId: data.responsibleId,
      },
    });
  }
}
