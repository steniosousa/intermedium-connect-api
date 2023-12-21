import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PlaceDatabase {
  constructor(private readonly prisma: PrismaService) { }

  async createPlace(name: string, companyId: string) {
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
        'Error - Error when registering environment',
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
        orderBy: {
          name: 'asc'
        }
      });
      return find;
    } catch {
      throw new HttpException(
        'Error - Error recovering environments',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePlace(id, name) {
    try {
      await this.prisma.place.update({
        where: {
          id
        }, data: {
          name
        }
      })
    } catch {
      throw new Error(' Error - Error when update environment')
    }
  }

  async deletePlace(id) {
    try {
      await this.prisma.place.delete({
        where: {
          id
        }
      })
    } catch (error) {
      let message = ' Error - Error when delete environment'
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }

  async placeInUse(id) {
    try {
     const inUse =  await this.prisma.place.findFirst({
        where: {
          Cleaning: {
            some: {
              placeId: id
            }
          },
          Schedule: {
            some: {
              placeId: id
            }
          }
        }
      })
      return inUse
    } catch (error) {
      let message = ' Error - Error when delete environment'
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }
}
