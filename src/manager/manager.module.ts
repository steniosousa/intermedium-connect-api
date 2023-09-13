import { Module } from '@nestjs/common';
import { managerController } from './controller/manager.controller';
import { managerService } from './service/manager.service';

@Module({
  controllers: [managerController],
  providers: [managerService],
})
export class managerModule {}
