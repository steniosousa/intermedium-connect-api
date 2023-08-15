import { Module } from '@nestjs/common';
import { cleaningController } from './controller/cleaning.controller';
import { cleaningService } from './service/cleaning.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [cleaningController],
  providers: [cleaningService],
  imports: [databaseModule],
})
export class cleaningModule {}
