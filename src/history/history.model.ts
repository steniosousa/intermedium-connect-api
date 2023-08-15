import { Module } from '@nestjs/common';
import { HistoryController } from './controller/history.controller';
import { historyService } from './service/history.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [HistoryController],
  providers: [historyService],
  imports: [databaseModule],
})
export class historyModel {}
