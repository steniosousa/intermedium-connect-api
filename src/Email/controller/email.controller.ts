import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from 'Email/service/email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    const result = await this.emailService.sendEmail(to, subject, text);
    return { message: 'Email enviado com sucesso!', result };
  }
}
