import { Injectable } from '@nestjs/common';
import { historyDatabase } from 'database/service/history.database';

@Injectable()
export class historyService {
  constructor(private readonly database: historyDatabase) {}
  async findHistory(userId) {
    const history = await this.database.findHistory(userId);
    return history;
  }
}
