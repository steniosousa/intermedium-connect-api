import { PrismaService } from 'database/service/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class CreateScheduleService {
  constructor(private readonly Prisma: PrismaService) { }

  async create(data) {
    try {
      for (const date of data.eventDate) {
        await this.Prisma.schedule.create({
          data: {
            placeId: data.placeId,
            eventDate: new Date(date),
            repeatable: data.repeatable,
            userId: data.userId,
          },
        });
      }
    } catch {
      throw new Error('Erro')
    }
  }

  async delete(scheduleId: string) {
    try {
      await this.Prisma.schedule.delete({
        where: {
          id: scheduleId,
        }
      })
    } catch (error) {
      throw new HttpException(
        'Error - Error when deleting schedule',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async recover(userId: string) {
    try {
      const recoverSchedule = await this.Prisma.schedule.findMany({
        where: {
          userId,
        },
        include: {
          place: {
            select: {
              name: true,
              id: true
            }
          }
        },

        orderBy: {
          eventDate: 'asc'
        }
      })
      return recoverSchedule
    } catch (error) {
      let message = 'Error ao recuperar agendamentos'
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }

  async edit(scheduleId) {
    try {
      const date = await this.Prisma.schedule.findUnique({
        where: {
          id: scheduleId
        }
      })
      if (!date) {
        throw new HttpException(
          'Error - Schedule not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.Prisma.schedule.update({
        where: {
          id: scheduleId,
        },
        data: {
          deactivatedAt: date.deactivatedAt ? null : new Date()
        }
      })
    } catch (error) {
      throw new HttpException(
        'Error - Error when deleting schedule',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
