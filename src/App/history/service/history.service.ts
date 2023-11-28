import { Injectable } from "@nestjs/common";
import { HistoryDatabase } from "database/service/history.database";

@Injectable()
export class HistoryService {
    constructor(private readonly database:HistoryDatabase) { }

    async recover(userId: string) { 
        const recover = await this.database.recover(userId)
        return recover
    }
}