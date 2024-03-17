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
      subject: 'Recuperação de senha - Intermedium',
      html: `
              <h1>Intermedium</h1>
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
      subject: 'Alteração de senha - Intermedium',
      html: `
              <h1>Intermedium</h1>
              <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAORCoEIyPfhuYFNMATcDK8vBZKwrdlOE9w&usqp=CAU"/>
              <p>Seu código de recuperação é: <strong>${resetPassword.password}</strong></p>
              <p>Obrigado por usar o nosso serviço.</p>
              <p>Atenciosamente, <br> Equipe Any Software</p>
            `,
    });

  }

  async createUser(email: string, userId: string, name: string) {
    await this.mailerService.sendMail({
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
        <a href="http://localhost:3000/resetPass/${userId}" style="text-decoration: none; color: #ffffff; background-color: #0073b7; padding: 10px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">Confirmar Senha</a>
        <p style="margin-top: 20px;">Obrigado por usar o nosso serviço.</p>
        <p>Atenciosamente, <br> Equipe Any Software</p>
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
  </table>
</body>
            
            </html>
            `,
    });

  }

  async recoverPass(email: string, userId: string, name: string) {
    await this.mailerService.sendMail({
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
    <a href="http://localhost:3000/resetPass/${userId}" style="text-decoration: none; color: #ffffff; background-color: #0073b7; padding: 10px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">Recuperar Senha</a>
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
</table>
</body>
        
        </html>
        `,
    });

  }
}