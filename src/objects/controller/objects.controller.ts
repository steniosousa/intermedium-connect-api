import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateObjectDto } from '../dto/createObject.dto';
import { DeleteObjectDto } from '../dto/deleteObject.dto';
import { objectService } from '../service/object.service';
import { getObect } from '../dto/getObject.dto';

@Controller('/object')
export class objectController {
  constructor(readonly service: objectService) {}
  @Post('/')
  async createObject(@Body() body: CreateObjectDto) {
    const { name, companyId } = body;

    const createObj = await this.service.createObject(name, companyId);
    return createObj;
  }

  @Get('/')
  async findObjects(@Body() body: getObect) {
    const { companyId } = body;
    const find = await this.service.findObjects(companyId);
    return find;
  }

  @Delete('/')
  async deleteObject(@Query() body: DeleteObjectDto) {
    const { objectId } = body;
    const deleteObject = await this.service.deleteObject(objectId);
    return deleteObject;
  }
}
