import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCleaningDto } from '../dto/createCleaning.dto';
import { findCleaningDto } from '../dto/findCleaning.dto';
import { cleaningService } from '../service/cleaning.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/cleaning')
export class cleaningController {
  constructor(readonly service: cleaningService) { }
  @Post('/')
  async createCleaning(@Body() body: CreateCleaningDto) {
    const create = await this.service.create(body);
    return create;
  }

  @Get('/')
  async getCleaning(@Query() query: findCleaningDto) {
    const find = await this.service.findCleaning(query.userId);
    return find;
  }

  @Post('/update')
  async updateCleaning(@Body() body: any) {
    const update = await this.service.updateCleaning(body);
    return update;
  }
}
