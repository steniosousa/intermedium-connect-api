import { Body, Controller, Get, Post, Query, Delete } from "@nestjs/common";
import { createEpiDto } from "epi/dto/create.epi.dto";
import { deleteEpiDto } from "epi/dto/delete.epi.dto";
import { editEpiDto } from "epi/dto/edit.epi.dto";
import { recoverEpiDto } from "epi/dto/recover.epi";
import { EpiService } from "epi/service/epi.service";

@Controller('/epis')
export class EpiController {
    constructor(private readonly service: EpiService) { }

    @Post('/create')
    async create(@Body() body: createEpiDto) {
        const { companyId, name } = body
        const createEpi = await this.service.create(companyId, name)
        return createEpi
    }
    @Get('/recover')
    async recover(@Query() { companyId }: recoverEpiDto) {
        const recover = await this.service.recover(companyId)
        return recover
    }

    @Delete('/delete')
    async delete(@Query() { episId }: deleteEpiDto) {
        const deleteEpi = await this.service.delete(episId)
       
        return deleteEpi
    }

    @Post('/update')
    async edit(@Body() { name, id }: editEpiDto) {
        await this.service.edit(name, id)
    }

}