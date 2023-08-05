import { Body, Controller, Post } from '@nestjs/common';
import { CreateObjectDto } from '../dto/createObject.dto';
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
}
