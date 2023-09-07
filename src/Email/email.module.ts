import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CatsController } from './controller/email.controller';
import { CatsService } from './service/email.service';
import { databaseModule } from 'database/database.module';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
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
        databaseModule
    ],
})
export class CatsModule { }
