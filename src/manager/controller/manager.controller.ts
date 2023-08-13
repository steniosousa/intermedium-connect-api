import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createManagerDto } from '../dto/createManager.dto';
import { deleteManagerDto } from '../dto/deleteManager.dto';
import { findManagerDto } from '../dto/findManager.dto';
import { managerService } from '../service/manager.service';
import { findUsersForManager } from '../dto/findUsersForManager.dto';

@Controller('/manager')
export class managerController {
  constructor(readonly service: managerService) {}

  @Post('/')
  async createManager(@Body() body: createManagerDto) {
    const createdManager = await this.service.createManager(
      body.name,
      body.companyId,
      body.password,
    );
    return createdManager;
  }

  @Get('/')
  async findManager(@Query() query: findManagerDto) {
    const { name, password } = query;
    const findManager = await this.service.findManager(name, password);

    return findManager;
  }

  @Get('/users')
  async findUsersForManager(@Query() query: findUsersForManager) {
    const { id } = query;
    const findUsersForManager = await this.service.findUsersForManager(id);
    console.log(findUsersForManager);
    return findUsersForManager;
  }

  @Post('/update')
  async updateManager(@Body() query: deleteManagerDto) {
    const update = await this.service.updateManager(query);
    return update;
  }

  @Delete('/delete')
  async deleteManager(@Body() body: deleteManagerDto) {
    const { managerId } = body;
    const deleteUser = await this.service.deleteManager(managerId);
    return deleteUser;
  }
}
