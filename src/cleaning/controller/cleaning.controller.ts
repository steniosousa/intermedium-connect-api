import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateCleaningDto } from '../dto/createCleaning.dto';
import { findCleaningDto } from '../dto/findCleaning.dto';
import { cleaningService } from '../service/cleaning.service';

@Controller('/cleaning')
export class cleaningController {
  constructor(readonly service: cleaningService) {}
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
}
