import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateCleaningDto } from '../dto/createCleaning.dto';
import { findCleaningDto } from '../dto/findCleaning.dto';
import { cleaningService } from '../service/cleaning.service';
import { GetAllCrons } from 'cleaning/dto/getAllCrons.dto';

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

  @Post('/update')
  async updateCleaning(@Body() body: any) {
    const update = await this.service.updateCleaning(body);
    return update;
  }

  @Post('/delete')
  async deleteCleaning(@Body() body: any) {
    const { id } = body;
    const deletion = await this.service.deletionCleaning(id);
    return deletion;
  }

  @Get('/cron')
  async getAllCron(@Query() Query:GetAllCrons){
    const {userId} = Query;
    const findAll = await this.service.findAllCrons(userId)
    return findAll
  }

}
