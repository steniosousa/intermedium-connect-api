import { Module } from "@nestjs/common";
import { ScheduleController } from "./controller/create-schedule-controller";
import CreateScheduleService from "./services/create-schedule.service";

@Module({
    controllers:[ScheduleController],
    providers:[CreateScheduleService]

})

export class ScheduleRoute{}