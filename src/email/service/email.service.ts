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
            html: `
              <h1>Intermédium</h1>
              <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU"/>

              <p>Sua nova senha de acesso é: <strong>${resetPassword}</strong></p>
              <p>Obrigado por usar o nosso serviço.</p>
              <p>Atenciosamente, <br> Equipe Any Software</p>
            `,
        });
    }

    async receiveCod(cat: any) {
        const resetPassword = await this.dabatase.findUserWithEmail(cat)

        await this.mailerService.sendMail({
            to: cat,
            subject: 'Alteração de senha - Intermédium',
            html: `
              <h1>Intermédium</h1>
              <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU"/>
              <p>Seu código de recuperação é: <strong>${resetPassword.password}</strong></p>
              <p>Obrigado por usar o nosso serviço.</p>
              <p>Atenciosamente, <br> Equipe Any Software</p>
            `,
        });

    }
}