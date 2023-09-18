import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';

@Injectable()
export class CleaningDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(body) {
    const { userId,  objects, placeId } = body;
    try {
      const cleaning = await this.prisma.cleaning.create({
        data: {
          userId,
          placeId,
          
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
      await this.prisma.cleaningObjects.deleteMany({
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
      console.log(error)
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
        include:{
          objects:{
            select:{
              object:true
            }
          },
          place:true,
        }
      });
      
      return allCleaning;
    } catch {
      throw new HttpException(
        'Error - Erro ao recuperar serviços',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async   findCleaningFiltered(userId) {
    try {
      const allCleaning = await this.prisma.cleaning.findMany({
        where: {
          userId,

          status:{
            not:{
              equals:"Finalizado"
            }
          }
        },
        include:{
          objects:{
            select:{
              object:true
            }
          },
          place:true,
        }
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
