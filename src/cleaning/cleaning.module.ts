import { Module } from '@nestjs/common';
import { CleaningController } from './controller/cleaning.controller';
import { cleaningService } from './service/cleaning.service';

@Module({
  controllers: [CleaningController],
  providers: [cleaningService],
})
export class CleaningModule {}
