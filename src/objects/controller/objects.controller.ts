import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateObjectDto } from '../dto/createObject.dto';
import { DeleteObjectDto } from '../dto/deleteObject.dto';
import { objectService } from '../service/object.service';

@Controller('/object')
export class objectController {
  constructor(readonly service: objectService) {}
  @Post('/')
  async createObject(@Body() body: CreateObjectDto) {
    const { name, companyId } = body;
    const createObj = await this.service.createObject(name, companyId);
    return createObj;
  }

  @Delete('/')
  async deleteObject(@Body() body: DeleteObjectDto) {
    const { objectId } = body;
    const deleteObject = await this.service.deleteObject(objectId);
    return deleteObject;
  }
}
