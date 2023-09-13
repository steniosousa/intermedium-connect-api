import { Module } from '@nestjs/common';
import { cleaningController } from './controller/cleaning.controller';
import { cleaningService } from './service/cleaning.service';

@Module({
  controllers: [cleaningController],
  providers: [cleaningService],
})
export class cleaningModule {}
