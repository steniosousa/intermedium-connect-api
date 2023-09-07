import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'config/prisma.service';
@Injectable()
export class UserDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async createNewUser(name: string, password: string, manager: string) {
    const existManager = await this.prisma.manager.findFirst({
      where: {
        name: manager,
      },
    });
    const existUser = await this.prisma.user.findFirst({
      where: {
        name,
      },
    });
    if (existUser) {
      throw new HttpException(
        'Error - Usuário já cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!existManager) {
      throw new HttpException(
        'Error - Administrador não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    function generateRandomAlphanumeric(digits) {
      let randomString = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;

      for (let i = 0; i < digits; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        randomString += characters.charAt(randomIndex);
      }

      return randomString;
    }
    
    const hashPassword = await bcrypt.hash(password, 6);
    const uniqueId = generateRandomAlphanumeric(6);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          hashPassword,
          password,
          managerId: existManager.id,
          companyId: existManager.companyId,
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

    // const passwordMatch = await bcrypt.compare(password, user.hashPassword);
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

    // const passwordMatch = await bcrypt.compare(password, user.hashPassword);
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
