import { Controller, Get, Query } from '@nestjs/common';
import { findHistoryDto } from '../dto/findHistory.dto';
import { historyService } from '../service/history.service';

@Controller('/history')
export class HistoryController {
  constructor(readonly service: historyService) {}
  @Get('/')
  async findHistory(@Query() query: findHistoryDto) {
    const { userId } = query;
    const find = await this.service.findHistory(userId);
    return find;
  }
}
