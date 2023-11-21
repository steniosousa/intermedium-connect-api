import { PrismaService } from 'database/service/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class CreateScheduleService {
  constructor(private readonly Prisma: PrismaService) { }

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

  async delete(scheduleId: string) {
    try {
      await this.Prisma.cleaning.update({
        where: {
          id: scheduleId
        }, data: {
          deletedAt: new Date()
        }
      })

    } catch {
      throw new HttpException(
        'Error - Error when deleting schedule',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
