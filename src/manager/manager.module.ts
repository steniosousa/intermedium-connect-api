import { Module } from '@nestjs/common';
import { ManagerController } from './controller/create.manager';
import { ManagerService } from './service/create.manager';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
