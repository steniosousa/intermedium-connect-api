import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateScheduleDto } from "schedule/dto/create-schedule.dto";
import CreateScheduleService from "schedule/services/create-schedule.service";

@Controller('/schedule')
export class ScheduleController{
    constructor(private readonly service:CreateScheduleService){}
    @Post('')
    async create(@Body() data:CreateScheduleDto){
        const createSchedule = await this.service.create(data);
        return createSchedule
    }

    @Get('')
    async find(@Query() userId){
        const allSchedule = await this.service.find(userId)
        return allSchedule
    }

    @Post('/edit')
    async edit(@Body() data){
        const editSchedule = await this.service.edit(data)
        return editSchedule
    }
}