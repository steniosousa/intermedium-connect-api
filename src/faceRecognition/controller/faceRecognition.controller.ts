import { Body, Controller, Post, Get, UseInterceptors } from '@nestjs/common';
import { faceRecognitiontService } from '../service/faceRecognition.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/faceRecognition')
export class faceRecognitionController {
  constructor(private readonly service: faceRecognitiontService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads', // Diretório para salvar os arquivos
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async create(@Body() body: any, 
) {
    try {
      console.log('Form Data:', body); // Dados do formulário

      const { name, plate, descritor,photo } = body;
      if(!photo || !name || !plate || !descritor ) throw new Error("Envie a todos os campos necessários")
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
