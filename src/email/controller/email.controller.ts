import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EmailService } from 'email/service/email.service';

@Controller('/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Get()
  async findAll() {
    return this.emailService.findAll();
  }

  @Post('/recover')
  async create(@Body() createCatDto: any) {
    const { to } = createCatDto;
    const cat = this.emailService.create(to);
    await this.emailService.sendNotificationEmail(cat);
    return cat;
  }

  @Post('/receiver')
  async receiver(@Body() datas) {
    const { email } = datas
    const cat = this.emailService.create(email);
    await this.emailService.receiveCod(cat)
  }
}