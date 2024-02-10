import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId, objectId, placeId, eventDate) {

    try {
      for (const date of eventDate) {
        await this.prisma.cleaning.create({
          data: {
            userId,
            placeId,
            createdAt: new Date(date),
            ObjectOfCleaning: {
              createMany: {
                data: objectId.map((item: string) => ({ objectId: item }))
              }
            },
          },

        });
      }

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
            },
          }
        },
        take: 10,
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
          evidences: true,
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
  async findCleaningApp(userId: string) {
    try {
      const allCleaning = await this.prisma.cleaning.findMany({
        where: {
          userId,
          AND: {
            deletedAt: {
              equals: null
            },
            status: {
              not: 'CONCLUIDO'
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
          evidences: true,
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
    if (params.body) {
      try {
        const altered = await this.prisma.cleaning.update({
          where: {
            id: params.body['Evidences'][0].id,
          },
          data: {
            evidences: {
              createMany: {
                data: params.body['Evidences'].map((item) => ({ evidenceUrl: item.evidenceUrl, type: item.type }))
              }
            },
            status: 'CONCLUIDO'
          }
        });

        return altered;
      } catch (error) {

        throw new HttpException(
          'Error - Error editing service',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    try {
      const altered = await this.prisma.cleaning.update({
        where: {
          id: params.id,
        },
        include: {
          Place: {
            select: {
              id: true,
              name: true,
            }
          },
          evidences: true,
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
