import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ManagerService } from '../service/create.manager';
import { CreateManagerDto } from '../dto/create.manager';
import { EditManagerDto } from '../dto/edit.manager';
import { recoverManagerDto } from '../dto/recover.manager';

@Controller('/manager')
export class ManagerController {
  constructor(private readonly service: ManagerService) {}

  @Post('/create')
  async create(@Body() body: CreateManagerDto) {

    const create = await this.service.create({
      companyId: body.companyId,
      email: body.email,
      role: body.role,
      permissions: body.permissions,
      name: body.name,
    });
    return create;
  }

  @Get('/find')
  async find(@Query() query: any) {
    const { email, password } = query;
    const find = await this.service.find(email, password);
    return find;
  }

  @Post('/edit')
  async edit(@Body() body: EditManagerDto) {
    const edit = await this.service.edit(body);
    return edit;
  }

  @Post('/resetPass')
  async resetPass(@Body() {password, id}: {password:string, id:string}) {
    const edit = await this.service.resetPass(password,id);
    return edit;
  }

  @Get('/recover')
  async recover(@Query() { companyId }: recoverManagerDto) {
    const recover = await this.service.recover(companyId);
    return recover;
  }

  @Post('/recoverPass')
  async recoverPass(@Body() body: { email: string }) {
    const recoverPass = await this.service.recoverPass(body.email);
  }
}
