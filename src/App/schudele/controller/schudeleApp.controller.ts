import { Body, Controller, Post } from "@nestjs/common";
import { CreateSchudeleDto } from "../dto/create.schudeleApp";
import { ScheduleAppService } from "../service/scheduleApp.service";

@Controller('schudele/app')
export class SchudeleAppCotroller {
    constructor(private readonly service:ScheduleAppService) { }


    @Post('/save')
    async saveEvidences(@Body() { Evidences }: CreateSchudeleDto) {
        await this.service.create(Evidences)
    }
}