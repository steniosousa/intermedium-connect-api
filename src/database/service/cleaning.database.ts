import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId:string, objectId:string[], placeId:string, eventDate:Date[]) {
    try {
      for (const date of eventDate) {
        await this.prisma.cleaning.create({
          data: {
            userId,
            placeId,
            createdAt: new Date(date),
            ObjectOfCleaning: {
              createMany: {
                data: objectId.map((item: string) => ({ objectId: item })),
              },
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
              equals: 'PENDENTE',
            },
          },
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error - Erro ao excluir solicitação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findCleaning(userId: string, page: any) {
    try {
const total = await this.prisma.cleaning.count({
  where: {
    userId,
    AND: {
      deletedAt: {
        equals: null,
      },
    },
  },
});

if (page) {
  const allCleaning = await this.prisma.cleaning.findMany({
    where: {
      userId,
      AND: {
        deletedAt: {
          equals: null,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Place: {
        select: {
          id: true,
          name: true,
        },
      },
      evidences: true,
      ObjectOfCleaning: {
        select: {
          object: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    skip: (page - 1) * 5,
    take: 5,
  });

  const formattedAllCleaning = allCleaning.map(cleaning => {
    return {
      ...cleaning,
        createdAt: new Date(cleaning.createdAt).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
    };
  });

  return { cleanings: formattedAllCleaning, total };
} else {
  const allCleaningWithoutPage = await this.prisma.cleaning.findMany({
    where: {
      userId,
      AND: {
        deletedAt: {
          equals: null,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Place: {
        select: {
          id: true,
          name: true,
        },
      },
      evidences: true,
      ObjectOfCleaning: {
        select: {
          object: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const formattedAllCleaningWithoutPage = allCleaningWithoutPage.map(cleaning => {
    return {
      ...cleaning,
      createdAt: new Date(cleaning.createdAt).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
    };
  });

  return { cleanings: formattedAllCleaningWithoutPage, total };
}

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
              equals: null,
            },
            status: {
              not: 'CONCLUIDO',
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          Place: {
            select: {
              id: true,
              name: true,
            },
          },
          evidences: true,
          ObjectOfCleaning: {
            select: {
              object: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      
      const formattedAllCleaning = allCleaning.map(cleaning => {
        return {
          ...cleaning,
          createdAt: new Date(cleaning.createdAt).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo', 
          }),
        };
      });
      
      return formattedAllCleaning;
      
    } catch {
      throw new HttpException(
        'Error - Error recovering services',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCleaning(id:string, evidences:any, status:any) {
    try {
      const altered = await this.prisma.cleaning.update({
        where: {
          id: id,
        },
        data: {
          evidences: {
            createMany: {
              data: evidences.map((item:any) => ({
                evidenceUrl: item.evidenceUrl,
                type: item.type,
              })),
            },
          },
          status: 'CONCLUIDO',
        },
      });

      return altered;
    } catch (error) {
      throw new HttpException(
        'Error - Error editing service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStatus(status:any, id:string) {
    try {
      const altered = await this.prisma.cleaning.update({
        where: {
          id: id,
        },
        data: {
          status,
        },
        include:{
          ObjectOfCleaning:{
            include:{
              object:true
            }            
          }
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

  async findCleaningWithoutEvidences(id:string) {
    try {
      const altered = await this.prisma.evidence.findFirst({
        where: {
          cleaningId: id,
        },
      });
      return altered;
    } catch (error) {
      throw new HttpException(
        'Error - Erro ao editar serviço',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
