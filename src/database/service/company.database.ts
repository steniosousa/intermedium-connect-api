import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';

@Injectable()
export class companyDatabase {
  constructor(private readonly prisma: PrismaService) {}
  async createCompany(name: string) {
    const verify = await this.prisma.company.findMany({
      where: {
        name,
      },
    });

    if (verify.length != 0) {
      throw new HttpException(
        'Error - Empresa já cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const create = await this.prisma.company.create({
        data: {
          name: name,
        },
      });
      return create;
    } catch {
      throw new HttpException(
        'Error - Não foi possível cadastrar a empresa',
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
        'Error - Empresa não cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async allCompanys() {
    try {
      const all = await this.prisma.company.findMany();
      return all;
    } catch {
      throw new HttpException(
        'Error - Erro ao recuperar Empresas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCompany(name: string) {
    try {
      const deleteCompany = await this.prisma.company.deleteMany({
        where: {
          name,
        },
      });
      return deleteCompany;
    } catch {
      throw new HttpException(
        'Error - Empresa já cadastrada',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
