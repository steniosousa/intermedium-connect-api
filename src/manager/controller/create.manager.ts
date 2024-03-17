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
            companyId: body.companyId,
            email: body.email,
            role: body.role,
            permissions: body.permissions,
            name: body.name
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

    @Post('/recoverPass')
    async recoverPass(@Body() body: { email: string }) {
        const recoverPass = await this.service.recoverPass(body.email)
    }
}