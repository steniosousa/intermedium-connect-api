import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FaceRecognitionDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    plate: string;
    photo: string;
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
      const newUser = await this.prisma.userFaceRecognition.findMany({
        where:{
          present:false
        }
      });
      return newUser;
    } catch {
      throw new HttpException(
        'Error - Erro ao retornat usuários',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listInsiders(){
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

  async Edit(driverId:string) {
    try {
      const user = await this.prisma.userFaceRecognition.findUnique({
        where: {
          id: driverId
        }
      });
      
      if (user) {
        const editUser = await this.prisma.userFaceRecognition.update({
          where: {
            id: driverId
          },
          data: {
            present: !user.present
          }
        });
        return editUser;
      }
    } catch {
      throw new HttpException(
        'Error - Erro ao cadastrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(driverId:string){
    try {
 await this.prisma.userFaceRecognition.delete({
 where:{
  id:driverId
 }
      });
    } catch {
      throw new HttpException(
        'Error - Erro ao deletar usuários',
        HttpStatus.BAD_REQUEST,
      );
    }

  }

  
}
