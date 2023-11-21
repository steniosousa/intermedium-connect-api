import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/service/prisma.service';

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(filters?: Prisma.UserFindManyArgs['where']) {
    const users = await this.prisma.user.findMany({
      where: filters,
    });

    return users;
  }

  async create(userData: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({ data: userData });

    return user;
  }

  async delete(id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return user;
  }
}
