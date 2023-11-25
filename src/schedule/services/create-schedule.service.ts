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
      await this.Prisma.cleaning.update({
        where: {
          id: scheduleId,
          AND: {
            status: {
              equals: 'PENDENTE'
            }
          }
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
      console.log(recoverSchedule)
      return recoverSchedule
    } catch (error) {
      let message = 'Error ao recuperar agendamentos'
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }
}
