import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from 'Email/service/email.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: any) {
    const {to} = createCatDto;
    const cat = this.catsService.create(to);
    await this.catsService.sendNotificationEmail(cat);
    return cat;
  }
}
