import { Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';

@Injectable()
export default class CreateScheduleService {
  constructor(private readonly Prisma: PrismaService) {}

  async create(data) {
    if (!data.automated) {
      const cleaning = await this.Prisma.cleaning.create({
        data: {
          userId: data.userId,
          placeId: data.placeId,
        },
      });
      const cleaningObjects = data.objects.map((objectsId) => {
        return {
          cleaningId: cleaning.id,
          objectsId,
        };
      });

      await this.Prisma.cleaningOfObjects.createMany({
        data: cleaningObjects,
      });

      return;
    }
    await this.Prisma.schedule.create({
      data: {
        placeId: data.placeId,
        eventDate: data.eventDate,
        repeatable: data.repeatable,
        responsibleId: data.responsibleId,
        objects: {
          createMany: {
            data: data.objects.map((id) => ({ objectId: id })),
          },
        },
      },
    });
  }
}
