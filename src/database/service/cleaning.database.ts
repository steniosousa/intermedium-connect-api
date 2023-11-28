import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId, objectId, placeId) {

    try {
      const cleaning = await this.prisma.cleaning.create({
        data: {
          userId,
          placeId,
          ObjectOfCleaning: {
            createMany: {
              data: objectId.map((item: string) => ({ objectId: item }))
            }
          },
        },

      });

      return cleaning;
    } catch (error) {
      throw new HttpException(
        'Error - Error when registering service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async deletion(id: string) {
    try {
      await this.prisma.cleaning.update({
        where: {
          id,
          AND: {
            status: {
              equals: 'PENDENTE'
            }
          }
        },
        data: {
          deletedAt: new Date()
        }

      });
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error - Erro ao excluir solicitação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findCleaning(userId: string) {
    try {
      const allCleaning = await this.prisma.cleaning.findMany({
        where: {
          userId,
          AND: {
            deletedAt: {
              equals: null
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        },
        include: {
          Place: {
            select: {
              id: true,
              name: true,
            }
          },
          ObjectOfCleaning: {
            select: {
              object: {
                select: {
                  name: true,
                  id: true
                }
              }
            }
          }
        }
      });
      return allCleaning;
    } catch {
      throw new HttpException(
        'Error - Error recovering services',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async updateCleaning(params) {
    try {
      const altered = await this.prisma.cleaning.update({
        where: {
          id: params.id,
        },
        data: params,
      });

      return altered;
    } catch (error) {
      throw new HttpException(
        'Error - Error editing service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
