import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly transporter: Transporter) {}

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'AnySoftware@gmail.com',
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
