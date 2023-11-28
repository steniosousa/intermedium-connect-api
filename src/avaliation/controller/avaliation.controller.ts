import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { createAvaliationDto } from "avaliation/dto/create.avaliation";
import { recoverAvaliationDto } from "avaliation/dto/recover.avaliation";
import { AvaliationService } from "avaliation/service/avalition.service";

@Controller('/avaliation')
export class AvaliationController {
    constructor(private readonly service: AvaliationService) { }

    @Post('/create')
    async create(@Body() body: createAvaliationDto) {
        const { episId, managerId, observation, status, scheduleId } = body
        await this.service.create(episId, managerId, observation, status, scheduleId)
    }

    @Get('/recover')
    async recover(@Query() { userId }: recoverAvaliationDto) {
        const recover = await this.service.recover(userId)
        return recover
    }
}