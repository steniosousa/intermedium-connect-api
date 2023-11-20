import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { createServiceDto } from '../dto/create.user.dto';
import { deleteUserDto } from '../dto/delete.user.dto';
import { findUserDto } from '../dto/find.user.dto';
import { findUserWithNameAndPasswordDto } from '../dto/findWithNameAndPassword';
import { updateUserDto } from '../dto/update.user.dto';
import { userService } from '../service/user.service';
import { CreateUserService } from 'user/service/create-employee.service';

@Controller('/user')
export class userController {
  constructor(
    readonly service: userService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post('/')
  async createUser(@Body() body: createServiceDto) {
    const user = await this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      companyId: body.companyId,
    });

    return user;
  }

  @Get('/')
  async findUser(@Query() query: findUserDto) {
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

  @Get('/allUsers')
  async getAllUsers(@Param() managerId: string) {
    const allUsers = await this.service.getAllUsers();
    return allUsers;
  }
}
