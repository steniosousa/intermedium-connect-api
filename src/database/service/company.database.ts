import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class companyDatabase {
  constructor(private readonly prisma: PrismaService) { }
  async createCompany(name: string) {
    try {
      const create = await this.prisma.company.create({
        data: {
          name: name,
        },
      });
      return create;
    } catch {
      throw new HttpException(
        'Error - Unable to register company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findCompany(name: string) {
    try {
      const company = await this.prisma.company.findFirst({
        where: {
          name,
        },
      });
      return company;
    } catch {
      throw new HttpException(
        'Error - Company not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async allCompanys() {
    try {
      const all = await this.prisma.company.findMany({
        orderBy: {
          name: 'asc'
        },
      });
      return all;
    } catch {
      throw new HttpException(
        'Error - Error recovering Companies',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCompany(companyId: string) {
    try {
      const deleteCompany = await this.prisma.company.delete({
        where: {
          id: companyId,
        },
      });
      return deleteCompany;
    } catch {
      throw new HttpException(
        'Error - Unable to delete company',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
