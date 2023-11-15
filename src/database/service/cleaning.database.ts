import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(body) {
    const { userId, placeId } = body;
    try {
      const cleaning = await this.prisma.cleaning.create({
        data: {
          userId,
          placeId,
        },
      });

      return cleaning;
    } catch (error) {
      throw new HttpException(
        'Error - Erro ao cadastrar serviço',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletion(id) {
    try {
      await this.prisma.cleaning.delete({
        where: {
          id,
        },
      });
    } catch (error) {
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

      return allCleaning;
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
