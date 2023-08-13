import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createServiceDto } from '../dto/create.user.dto';
import { deleteUserDto } from '../dto/delete.user.dto';
import { findUserDto } from '../dto/find.user.dto';
import { findUserWithNameAndPasswordDto } from '../dto/findWithNameAndPassword';
import { updateUserDto } from '../dto/update.user.dto';
import { userService } from '../service/user.service';

@Controller('/user')
export class userController {
  constructor(readonly service: userService) {}
  @Post('/')
  async createUser(@Body() body: createServiceDto) {
    console.log(body);
    const create = await this.service.createUser(body);
    return create;
  }

  @Get('/')
  async findUser(@Query() query: findUserDto) {
    console.log(query);
    const find = await this.service.findUser(query);
    return find;
  }

  @Get('/recuper')
  async findUserWithNameAndPass(
    @Query() query: findUserWithNameAndPasswordDto,
  ) {
    const find = await this.service.findUserWithNameAndPass(query);
    return find;
  }

  @Post('/update')
  async updateUser(@Body() query: updateUserDto) {
    const update = await this.service.updateUser(query);
    return update;
  }

  @Delete('/delete')
  async deleteUser(@Body() body: deleteUserDto) {
    const deleteUser = await this.service.delete(body);
    return deleteUser;
  }
}
