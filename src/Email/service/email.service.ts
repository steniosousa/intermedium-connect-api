import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { managerDatabase } from 'database/service/manager.database';

@Injectable()
export class CatsService {
  private readonly cats = [];

  constructor(private readonly mailerService: MailerService, private readonly dabatase:managerDatabase) {}

  findAll() {
    return this.cats;
  }

  create(cat: any) {
    this.cats.push(cat);
    return cat;
  }

  async sendNotificationEmail(cat: any) {
    const resetPassword = await this.dabatase.editionPassword(cat)
    await this.mailerService.sendMail({
      to: cat,
      subject: 'Recuperação de senha - Intermédium',
      text: `Sua nova senha de acesso é ${resetPassword}`,
    });
  }
}
