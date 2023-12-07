import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { CreateManagerDto } from "manager/dto/create.manager";
import { EditManagerDto } from "manager/dto/edit.manager";
import { recoverManagerDto } from "manager/dto/recover.manager";
import { ManagerService } from "manager/service/create.manager";

@Controller('/manager')
export class ManagerController {
    constructor(private readonly service: ManagerService) { }

    @Post('/create')
    async create(@Body() body: CreateManagerDto) {
        const create = await this.service.create({
            name: body.name,
            email: body.email,
            companyId: body.companyId,
            password: body.password,
            role:body.role,
            permissions:body.permissions
        });
        return create
    }

    @Get('/find')
    async find(@Query() query: any) {
        const { email, password } = query
        const find = await this.service.find(
            email,
            password
        )
        return find
    }

    @Post('/edit')
    async edit(@Body() body: EditManagerDto) {
        const edit = await this.service.edit(body)
        return edit
    }

    @Get('/recover')
    async recover(@Query() { companyId }: recoverManagerDto) {
        const recover = await this.service.recover(companyId)
        return recover
    }
}