import { Module } from '@nestjs/common';
import { HistoryController } from './controller/history.controller';
import { historyService } from './service/history.service';

@Module({
  controllers: [HistoryController],
  providers: [historyService],
})
export class historyModel {}
