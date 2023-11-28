import { Controller, Get, Query } from "@nestjs/common";
import { recoverHistory } from "../dto/recover.history";
import { HistoryService } from "../service/history.service";

@Controller('/histories')
export class HistoryController{   
    constructor(private readonly service:HistoryService){}

    @Get('/recover')
    async recover(@Query() {userId}:recoverHistory){
        const recover = await this.service.recover(userId)
        return recover
    }
}