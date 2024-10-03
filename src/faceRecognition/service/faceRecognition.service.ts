import { FaceRecognitionDatabase } from '@/database/service/faceRecognition.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class faceRecognitiontService {
  constructor(private readonly idatabase: FaceRecognitionDatabase) {}

  async create({
    name,
    plate,
    photo,
  }: {
    name: string;
    plate: string;
    photo: string;
  }) {
    try {
      const createUser = await this.idatabase.create({
        name,
        plate,
        photo,
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

  async list() {
    try {
      const foundObjects = await this.idatabase.listInsiders();

      return foundObjects;
    } catch (error) {
      let messager = 'Erro ao buscar todos os usuarios';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  async edit(driverId:string){
    try {
      const editDriver = await this.idatabase.Edit(driverId);
      return editDriver;
    } catch (error) {
      let messager = 'Erro ao editar motorista';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }


  async delete(driverId:string){
    try{
      await this.idatabase.delete(driverId)
    }catch(error){
      let messager = 'Erro ao deletar motorista';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }
}
