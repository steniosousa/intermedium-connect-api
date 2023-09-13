import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';

interface ScheduleCleaningParams {
  placeId: string;
  responsibleId: string;
  objectsIds: string[];
  eventDate: Date;
  repeatable: boolean;
}

@Injectable()
export class ScheduleCleaningService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: ScheduleCleaningParams) {
    if (params.eventDate < new Date()) {
      throw new ForbiddenException(
        'cant create a new schedule to the past day',
      );
    }

    await this.prismaService.schedule.create({
      data: {
        ...params,
        objects: {
          createMany: {
            data: params.objectsIds.map((id) => ({ objectId: id })),
          },
        },
      },
    });
  }
}
