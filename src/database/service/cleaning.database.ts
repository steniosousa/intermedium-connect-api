import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(body) {
    const { userId, where, objects } = body;
    console.log(userId, where, objects);
    try {
      // Primeiro, criamos a limpeza sem os objetos
      const cleaning = await this.prisma.cleaning.create({
        data: {
          userId,
          where,
        },
      });

      // Em seguida, criamos a associação entre a limpeza e os objetos
      const cleaningObjects = objects.map((objectsId) => {
        return {
          cleaningId: cleaning.id,
          objectsId,
        };
      });

      await this.prisma.cleaningOfObjects.createMany({
        data: cleaningObjects,
      });

      return cleaning;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error - Erro ao cadastrar serviço',
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
}
