import { AvaliationDatabase } from '@/database/service/avaliation.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AvaliationService {
  constructor(private readonly database: AvaliationDatabase) {}

  async create(episId:string[], managerId:string, observation:string, status:any, scheduleId:string) {
    await this.database.create(
      episId,
      managerId,
      observation,
      status,
      scheduleId,
    );
  }
  async recover(userId:string) {
    const recover = await this.database.recover(userId);
    return recover;
  }
}
