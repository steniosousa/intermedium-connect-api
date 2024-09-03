import { Body, Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { createUserFaceRecognitiontDto } from '../dto/create.faceRecognition.dto';
import { faceRecognitiontService } from '../service/faceRecognition.service';

@Controller('/faceRecognition')
export class faceRecognitionController {
  constructor(private readonly service: faceRecognitiontService) {}

  @Post('/create')
  async create(@Body() body: createUserFaceRecognitiontDto) {
    try {
      const { name, descritor, photo, plate } = body;
      const createUser = await this.service.create({
        name,
        descritor,
        photo,
        plate,
      });
      return createUser;
    } catch (error) {
      let messager = 'Unable to save object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  @Get('/recover')
  async recover() {
    try {
      const foundFaces = await this.service.recover();
      return foundFaces;
    } catch (error) {
      let messager = 'Unable to found object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }
}
