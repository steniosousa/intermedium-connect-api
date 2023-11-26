import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDatabase } from 'database/service/user.database';

@Injectable()
export class EmailService {
    private readonly cats = [];

    constructor(private readonly mailerService: MailerService, private readonly dabatase: UserDatabase) { }
    findAll() {
        return this.cats;
    }

    create(cat: any) {
        this.cats.push(cat);
        return cat;
    }

    async sendNotificationEmail(cat: any) {
        const resetPassword = await this.dabatase.findUserWithEmail(cat)
        await this.mailerService.sendMail({
            to: cat,
            subject: 'Recuperação de senha - Intermédium',
            text: `Sua nova senha de acesso é ${resetPassword}`,
        });
    }

    async receiveCod(cat: any) {
        const resetPassword = await this.dabatase.findUserWithEmail(cat)
        console.log(resetPassword)
        await this.mailerService.sendMail({
            to: cat,
            subject: 'Alteração de senha - Intermédium',
            text: `Seu código de recuperação é:  ${resetPassword.password}`,
        });
    }
}