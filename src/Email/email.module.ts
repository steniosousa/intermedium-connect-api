import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './controller/email.controller';
import { EmailService } from './service/email.service';

@Module({
    controllers: [EmailController],
    providers: [EmailService],
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'steniosousaf@gmail.com',
                    pass: 'olykoikefmhjalqz',
                },
            },
            defaults: {
                from: '"stenio" <macacovelho.ss@gmail.com>',
            },
        }),
        DatabaseModule
    ],
})
export class emailModule { }