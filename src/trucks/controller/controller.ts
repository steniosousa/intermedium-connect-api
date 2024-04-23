import {
    Body,
    Controller,
    Post,
    Param,
    Get,
    Headers,
    Query
} from '@nestjs/common';
import { truckService } from "trucks/service/service";

@Controller('/truck')
export class truckController {
    constructor(
        private readonly service: truckService,
    ) { }

    @Post('/monitoring')
    async startMonitoring(@Body() body: any) {
        const { plate } = body
        const monitoring = await this.service.start(plate, body.coords.lat, body.coords.lng);

        return monitoring
    }

    @Get('/recover')
    async recoverTrucks(@Param() Param: any) {
        const recoverTrucks = await this.service.recoverTrucks()
        return recoverTrucks
    }

    @Get('/coords')
    async getCoods(@Query() Param: any) {
        const { plate } = Param

        const getCoords = await this.service.getCoords(plate)
        if (!getCoords) return "Sem coordenadas"
        return getCoords
    }
} 