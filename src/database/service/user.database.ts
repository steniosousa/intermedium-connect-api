import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserDatabase {
  constructor(private readonly prisma: PrismaService) {}

  private generateRandomAlphanumeric(digits) {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < digits; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  async createNewUser(name: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 6);
    const uniqueId = this.generateRandomAlphanumeric(6);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          password: hashPassword,
          loginHash: uniqueId,
        },
      });
      return newUser;
    } catch {
      throw new HttpException(
        'Error - Não foi possível cadastrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

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
}
