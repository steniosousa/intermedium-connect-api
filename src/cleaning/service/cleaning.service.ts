import { Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'src/database/service/cleaning.database';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) {}
  async create(body) {
    const newCleaning = await this.database.create(body);
    return newCleaning;
  }

  async findCleaning(userId: string) {
    const find = await this.database.findCleaning(userId);
    return find;
  }
}
