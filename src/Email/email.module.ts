import { Module } from '@nestjs/common';
import { EmailController } from './controller/email.controller';
import { EmailService } from './service/email.service';
import { DatabaseModule } from '@/database/database.module';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [DatabaseModule],
})
export class emailModule {}
