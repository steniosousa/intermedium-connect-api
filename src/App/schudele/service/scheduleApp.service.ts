import { scheduleAppDatabase } from '@/database/service/schudeleApp.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleAppService {
  constructor(private readonly database: scheduleAppDatabase) {}
  async create(Evidences:any) {
    await this.database.create(Evidences);
  }
}
