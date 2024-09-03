import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class EpiDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(companyId:string, name:string) {
    try {
      await this.prisma.equipment.create({
        data: {
          companyId,
          name,
        },
      });
    } catch {
      throw new Error('Unable to save epi');
    }
  }

  async findEpiWithNameAndCompanyId(companyId:string, name:string) {
    try {
      const epi = await this.prisma.equipment.findFirst({
        where: {
          companyId,
          name,
          deleteAt: {
            equals: null,
          },
        },
      });
      return epi;
    } catch {
      throw new Error('Unable to found epi');
    }
  }

  async recover(companyId:string) {
    try {
      const recover = await this.prisma.equipment.findMany({
        where: {
          companyId,
          AND: {
            deleteAt: {
              equals: null,
            },
          },
        },
      });
      return recover;
    } catch (error) {
      throw new Error('Unable to found all epi');
    }
  }

  async delete(episId:string) {
    try {
      await this.prisma.equipment.update({
        where: {
          id: episId,
        },
        data: {
          deleteAt: new Date(),
        },
      });
    } catch {
      throw new Error('Unable to delete epi');
    }
  }

  async edit(name:string, epiId:string) {
    try {
      await this.prisma.equipment.update({
        data: {
          name,
        },
        where: {
          id: epiId,
        },
      });
    } catch {
      throw new Error('Unable to edit epi');
    }
  }
}
