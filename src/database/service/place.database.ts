import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PlaceDatabase {
  constructor(private readonly prisma: PrismaService) {}
  async createPlace(name, companyId) {
    try {
      const save = await this.prisma.place.create({
        data: {
          name,
          companyId,
        },
      });
      return save;
    } catch (error) {
      throw new HttpException(
        'Error - Erro ao cadastrar ambiente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllPlaces(companyId: string) {
    try {
      const find = await this.prisma.place.findMany({
        where: {
          companyId,
        },
      });
      return find;
    } catch {
      throw new HttpException(
        'Error - Erro ao recuperar ambientes',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
