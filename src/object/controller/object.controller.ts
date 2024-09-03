import { Body, Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { ObjectService } from '../service/object.service';
import { createObjectDto } from '../dto/create.object.dto';
import { recoverObjectDto } from '../dto/recover.object';
import { deleteObjectDto } from '../dto/delete.object';
import { updateObjectDto } from '../dto/update.object';

@Controller('/objects')
export class ObjectController {
  constructor(private readonly service: ObjectService) {}

  @Post('/create')
  async create(@Body() body: createObjectDto) {
    try {
      const { name, companyId } = body;
      const newObject = await this.service.create(name, companyId);
      return newObject;
    } catch (error) {
      let messager = 'Unable to save object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  @Get('/recover')
  async recover(@Query() { companyId }: recoverObjectDto) {
    try {
      const foundObjects = await this.service.recover(companyId);
      return foundObjects;
    } catch (error) {
      let messager = 'Unable to found object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  @Delete('/delete')
  async delete(@Query() { objectsId }: deleteObjectDto) {
    try {
      const foundObjects = await this.service.delete(objectsId);
      return foundObjects;
    } catch (error) {
      let messager = 'Unable to delete object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }

  @Post('/update')
  async update(@Body() { id, name }: updateObjectDto) {
    try {
      const updateObjects = await this.service.update(id, name);
      return updateObjects;
    } catch (error) {
      let messager = 'Unable to update object';
      if (error instanceof Error) {
        messager = error.message;
      }
      throw new Error(messager);
    }
  }
}
