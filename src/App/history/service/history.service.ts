import { HistoryDatabase } from '@/database/service/history.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  constructor(private readonly database: HistoryDatabase) {}

  async recover(userId: string) {
    const recover = await this.database.recover(userId);
    return recover;
  }
}
