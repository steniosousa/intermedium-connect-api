import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async authenticateUser(key: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          loginHash: key,
        },
      });

      return user;
    } catch {
      throw new HttpException(
        'Error - Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserWithNameAndPassword(name: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name,
          password,
        },
      });
      return user;
    } catch {
      throw new HttpException(
        'Error - Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(query) {
    const { userId } = query;
    const indentify = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!indentify) {
      throw new HttpException(
        'Error - Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: query,
    });
    return updateUser;
  }

  async deleteUser(userId: string) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deleteUser;
  }

  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }
}
