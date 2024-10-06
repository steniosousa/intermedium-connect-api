import { Body, Controller, Post, Get, UseInterceptors, Query } from '@nestjs/common';
import { faceRecognitiontService } from '../service/faceRecognition.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { editUserFaceRecognitiontDto } from '../dto/edit.driver.dto';

@Controller('/faceRecognition')
export class faceRecognitionController {
  constructor(private readonly service: faceRecognitiontService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async create(@Body() body: any, 
) {
      const { name, plate, photo } = body;
      if(!photo || !name || !plate  ) throw new Error("Envie a todos os campos necessários")
      const createUser = await this.service.create({
        name,
        photo,
        plate,
      });
     return createUser;
    
  }

  @Get('/recover')
  async recover() {
    try {
      const foundFaces = await this.service.recover();
      return foundFaces;
    } catch (error) {
      let messager = 'Erro ao recuperar motoristas';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }


  @Post('/edit')
  async edit(@Body() { driverId }: editUserFaceRecognitiontDto){
    try{
        const driver = await this.service.edit(driverId)
        return driver
    }
    catch (error) {
      let messager = 'erro ao editar motorista';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
  }}



  @Get('/list')
  async list() {
    try {
      const foundFaces = await this.service.list();
      return foundFaces;
    } catch (error) {
      let messager = 'Erro ao recuperar motoristas';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }


  @Post('/delete')
  async delete(@Body() {driverId}:{driverId:string}) {
    try {
      const foundFaces = await this.service.delete(driverId);
      return foundFaces;
    } catch (error) {
      let messager = 'Erro ao deletar motoristas';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }
}
