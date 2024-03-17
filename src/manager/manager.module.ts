import { Module } from '@nestjs/common';
import { ManagerController } from './controller/create.manager';
import { ManagerService } from './service/create.manager';
import { EmailService } from 'Email/service/email.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService,EmailService],
})
export class ManagerModule {}
