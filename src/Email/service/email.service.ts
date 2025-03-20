import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UserDatabase } from '@/database/service/user.database';

@Injectable()
export class EmailService {
  private readonly cats: string[] = [];

  private transporter;

  constructor(private readonly database: UserDatabase) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'steniosousaf@gmail.com',
        pass: 'olykoikefmhjalqz',
      },
    });
  }

  findAll() {
    return this.cats;
  }

  create(cat: string) {
    this.cats.push(cat);
    return cat;
  }

  async sendNotificationEmail(cat: any) {
    const resetPassword = await this.database.findUserWithEmail(cat);

    const mailOptions = {
      from: 'Intermedium', 
      to: cat, 
      subject: 'Recuperação de senha - Intermedium',
      html: `
        <h1>Intermedium</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU" />
        <p>Sua nova senha de acesso é: <strong>${resetPassword}</strong></p>
        <p>Obrigado por usar o nosso serviço.</p>
        <p>Atenciosamente, <br> Equipe Any Software</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error('Falha ao enviar o e-mail de notificação.');
    }
  }

  async receiveCod(cat: any) {
    const resetPassword = await this.database.findUserWithEmail(cat);
    if (!resetPassword) return;

    const mailOptions = {
      from: 'Intermedium',
      to: cat,
      subject: 'Alteração de senha - Intermedium',
      html: `
        <h1>Intermedium</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU" />
        <p>Seu código de recuperação é: <strong>${resetPassword.password}</strong></p>
        <p>Obrigado por usar o nosso serviço.</p>
        <p>Atenciosamente, <br> Equipe Any Software</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar o e-mail de código de recuperação:', error);
      throw new Error('Falha ao enviar o código de recuperação.');
    }
  }

  async createUser(email: string, userId: string, name: string) {
    const mailOptions = {
      from: 'intermedium',
      to: email,
      subject: 'Cadastro de novo usuário - Intermedium',
      html: `
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Intermedium - Confirmação de Cadastro</title>
          </head>
          <body style="font-family: sans-serif; margin: 0; padding: 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr>
                <td align="center" bgcolor="transparent" style="padding: 40px 0 30px 0;">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU" alt="Logo Intermedium" width="200" height="auto">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <h1>Intermedium</h1>
                  <h3>Click no botão para confirmar seu cadastro e definir sua senha</h3>
                  <a href="https://intermedium-duo-platform.vercel.app/resetPass/${userId}" style="text-decoration: none; color: #ffffff; background-color: #0073b7; padding: 10px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">Confirmar Senha</a>
                  <p style="margin-top: 20px;">Obrigado por usar o nosso serviço.</p>
                  <p>Atenciosamente, <br> Equipe Any Software</p>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f2f2f2" style="padding: 20px 0;">
                  <p style="font-size: 12px; color: #777;">&copy; 2023 Any Software. Todos os direitos reservados.</p>
                </td>
              </tr>
            </table>
            <p>Em caso de dúvidas ou problemas, entre em contato com nossa equipe de suporte através do email anysoftwareredes@gmail.com.</p>
            <p>Siga-nos nas redes sociais:</p>
            <ul>
              <li><a href="https://www.facebook.com/intermedium">Facebook</a></li>
              <li><a href="https://www.instagram.com/intermedium">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/intermedium">LinkedIn</a></li>
            </ul>
          </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Falha ao enviar o e-mail de cadastro.');
    }
  }

  async recoverPass(email: string, userId: string, name: string) {
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Recuperação de senha - Intermedium',
      html: `
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Intermedium - Confirmação de Cadastro</title>
          </head>
          <body style="font-family: sans-serif; margin: 0; padding: 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr>
                <td align="center" bgcolor="transparent" style="padding: 40px 0 30px 0;">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU" alt="Logo Intermedium" width="200" height="auto">
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <h1>Olá ${name},</h1>
                  <p>Seja bem-vindo(a) à Intermedium!</p>
                  <p>Com a Intermedium, você pode:</p>
                  <ul>
                    <li>Gerenciar seus projetos de forma eficiente.</li>
                    <li>Colaborar com sua equipe em tempo real.</li>
                    <li>Acompanhar o progresso de suas tarefas.</li>
                    <li>E muito mais!</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                  <h1>Intermedium</h1>
                  <h3>Click para recuperar sua senha</h3>
                  <a href="https://intermedium-duo-platform.vercel.app/resetPass/${userId}" style="text-decoration: none; color: #ffffff; background-color: #0073b7; padding: 10px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">Recuperar Senha</a>
                  <p style="margin-top: 20px;">Obrigado por usar o nosso serviço.</p>
                  <p>Atenciosamente, <br> Equipe Any Software</p>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#f2f2f2" style="padding: 20px 0;">
                  <p style="font-size: 12px; color: #777;">&copy; 2023 Any Software. Todos os direitos reservados.</p>
                </td>
              </tr>
            </table>
            <p>Em caso de dúvidas ou problemas, entre em contato com nossa equipe de suporte através do email anysoftwareredes@gmail.com.</p>
            <p>Siga-nos nas redes sociais:</p>
            <ul>
              <li><a href="https://www.facebook.com/intermedium">Facebook</a></li>
              <li><a href="https://www.instagram.com/intermedium">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/intermedium">LinkedIn</a></li>
            </ul>
          </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação de senha:', error);
      throw new Error('Falha ao enviar o e-mail de recuperação de senha.');
    }
  }
}
