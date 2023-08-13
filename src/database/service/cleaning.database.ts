import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(body) {
    const { userId, where, objects } = body;
    console.log(userId, where, objects);

    try {
      const cleaning = await this.prisma.cleaning.create({
        data: {
          userId,
          where,
        },
      });

      const cleaningObjects = objects.map((objectsId) => {
        return {
          cleaningId: cleaning.id,
          objectsId,
        };
      });

      await this.prisma.cleaningOfObjects.createMany({
        data: cleaningObjects,
      });
      console.log(cleaning);
      return cleaning;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error - Erro ao cadastrar serviço',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletion(id) {
    try {
      await this.prisma.cleaningOfObjects.deleteMany({
        where: {
          cleaningId: id,
        },
      });
      await this.prisma.cleaning.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error - Erro ao excluir solicitação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findCleaning(userId) {
    try {
      const allCleaning = await this.prisma.cleaning.findMany({
        where: {
          userId,
        },
      });

      const clearPromises = allCleaning.map(async (cleaning) => {
        const clear = await this.prisma.cleaningOfObjects.findMany({
          where: {
            cleaningId: cleaning.id,
          },
          select: {
            cleaning: {
              select: {
                id: true,
                where: true,
                status: true,
                createAt: true,
              },
            },
            object: {
              select: {
                name: true,
              },
            },
            id: true,
          },
        });

        return clear;
      });

      const clearResults = await Promise.all(clearPromises);

      return clearResults;
    } catch {
      throw new HttpException(
        'Error - Erro ao recuperar serviços',
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
        include: {
          objects: {
            include: {
              object: true,
            },
          },
        },
      });

      return altered;
    } catch (error) {
      throw new HttpException(
        'Error - Erro ao cadastrar serviço',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
