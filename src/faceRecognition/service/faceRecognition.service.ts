import { FaceRecognitionDatabase } from '@/database/service/faceRecognition.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class faceRecognitiontService {
  constructor(private readonly idatabase: FaceRecognitionDatabase) {}

  async create({
    name,
    plate,
    photo,
    descritor,
  }: {
    name: string;
    plate: string;
    photo: string;
    descritor: string;
  }) {
    try {
      const createUser = await this.idatabase.create({
        name,
        plate,
        photo,
        descritor,
      });
      return createUser;
    } catch (error) {
      let messager = 'Erro ao salvar usuario';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  async recover() {
    try {
      const foundObjects = await this.idatabase.List();

      return foundObjects;
    } catch (error) {
      let messager = 'Erro ao buscar todos os usuarios';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }
}
