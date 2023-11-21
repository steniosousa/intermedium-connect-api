import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserDatabase {
  constructor(private readonly prisma: PrismaService) { }

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
        'Error - User not found',
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

  async updateUser(userId, datas) {
    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: datas,
    });
    return updateUser;
  }

  async findUser(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      return user

    } catch (error) {
      throw new HttpException(
        'Error - User not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async deleteUser(userId: string) {
    try {
      const deleteUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          deletedAt: new Date()
        }
      });
      return deleteUser;

    } catch {
      throw new HttpException(
        'Error - Error when deleting user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }
}
