import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { HistoryController } from './controller/history.controller';
import { historyService } from './service/history.service';

@Module({
  controllers: [HistoryController],
  providers: [historyService],
  imports: [databaseModule],
})
export class historyModel {}
