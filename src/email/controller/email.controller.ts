import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailService } from 'email/service/email.service';

@Controller('/reset')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async findAll() {
    return this.emailService.findAll();
  }

  @Post('/recover')
  async create(@Body() createCatDto: any) {
    const {to} = createCatDto;
    const cat = this.emailService.create(to);
    await this.emailService.sendNotificationEmail(cat);
    return cat;
  }
}