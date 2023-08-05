import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { cleaningController } from './controller/cleaning.controller';
import { cleaningService } from './service/cleaning.service';

@Module({
  controllers: [cleaningController],
  providers: [cleaningService],
  imports: [databaseModule],
})
export class cleaningModule {}
