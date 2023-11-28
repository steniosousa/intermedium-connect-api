import { Injectable } from '@nestjs/common';
import { AvaliationDatabase } from 'database/service/avaliation.database';

@Injectable()
export class AvaliationService {
    constructor(private readonly database: AvaliationDatabase) { }

    async create(episId, managerId, observation, status, scheduleId) {

        await this.database.create(episId, managerId, observation, status, scheduleId)
    }
    async recover(userId) {
        const recover = await this.database.recover(userId)
        return recover
    }
}