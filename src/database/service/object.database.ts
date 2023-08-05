import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class objectDatabase {
  constructor(private readonly prisma: PrismaService) {}
  async createObject(name: string, companyId: string) {
    try {
      const newObj = await this.prisma.objects.create({
        data: {
          name,
          companyId,
        },
      });
      return newObj;
    } catch {
      throw new HttpException(
        'Error - Erro ao cadastrar objeto',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteobj(objectId) {
    try {
      const deleteObj = await this.prisma.objects.delete({
        where: {
          id: objectId,
        },
      });
      return deleteObj;
    } catch {
      throw new HttpException(
        'Error - Erro ao deletar objeto',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
