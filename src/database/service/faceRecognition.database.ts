import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FaceRecognitionDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    plate: string;
    photo: string;
    descritor: string;
  }) {
    try {
      const newUser = await this.prisma.userFaceRecognition.create({
        data,
      });
      return newUser;
    } catch {
      throw new HttpException(
        'Error - Erro ao cadastrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async List() {
    try {
      const newUser = await this.prisma.userFaceRecognition.findMany();
      return newUser;
    } catch {
      throw new HttpException(
        'Error - Erro ao retornat usuários',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
