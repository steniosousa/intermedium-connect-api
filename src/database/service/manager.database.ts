import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'config/prisma.service';

@Injectable()
export class managerDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async createNewManager(name: string, companyId: string, password: string) {
    const existCompany = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
    if (!existCompany) {
      throw new HttpException(
        'Error - Empresa não encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const newManager = await this.prisma.manager.create({
        data: {
          name,
          hashPassword,
          companyId: companyId,
        },
      });
      return newManager;
    } catch {
      throw new HttpException(
        'Error - Não foi possível cadastrar administrador',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async authenticateManager(name: string, password: string) {
    const manager = await this.prisma.manager.findFirst({
      where: {
        name,
      },
    });

    if (!manager) {
      throw new HttpException(
        'Error - Administrador não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordMatch = await bcrypt.compare(password, manager.hashPassword);
    if (passwordMatch) {
      return manager;
    } else {
      throw new HttpException(
        'Error - Usuário ou senha incorreta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateManager(query) {
    const { managerId } = query;
    const indentify = await this.prisma.manager.findUnique({
      where: {
        id: managerId,
      },
    });
    if (!indentify) {
      throw new HttpException(
        'Error - Administrador não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateManager = await this.prisma.manager.update({
      where: {
        id: managerId,
      },
      data: query,
    });
    return updateManager;
  }
  async findUsersForManager(id: string) {
    const manager = await this.prisma.manager.findUnique({
      where: {
        id,
      },
      include: {
        companys: true,
        users: {
          include: {
            Cleaning: {
              where: {
                cron: 'Hoje',
              },
            },
          },
        },
      },
    });

    if (!manager) {
      throw new HttpException(
        'Error - Administrador não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedCleanings = [];

    for (const user of manager.users) {
      for (const cleaning of user.Cleaning) {
        const horaInteira = parseInt(cleaning.cronHors, 10); // Converte para número inteiro

        const currentCronHors = new Date();
        currentCronHors.setUTCHours(horaInteira, 0, 0, 0);

        const updatedCleaning = await this.prisma.cleaning.update({
          where: {
            id: cleaning.id,
          },
          data: {
            cronHors: currentCronHors.toISOString(),
          },
        });

        updatedCleanings.push(updatedCleaning);
      }
    }

    return {
      ...manager,
      updatedCleanings,
    };
  }

  async deleteUser(managerId: string) {
    const deleteManager = await this.prisma.manager.delete({
      where: {
        id: managerId,
      },
    });
    return deleteManager;
  }
}
