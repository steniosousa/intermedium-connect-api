import { Injectable } from "@nestjs/common";
import { scheduleAppDatabase } from "database/service/schudeleApp.database";

@Injectable()
export class ScheduleAppService {
    constructor(private readonly database: scheduleAppDatabase) { }
    async create(Evidences) {

        await this.database.create(Evidences)
    }
}