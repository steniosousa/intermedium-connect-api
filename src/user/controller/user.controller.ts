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
import { recoverUserDto } from 'user/dto/recover.user';
import { recoverAllUsersDto } from 'user/dto/recover.Allusers';
import { generatePdfDto } from 'user/dto/generatePdf.dto';

@Controller('/user')
export class userController {
  constructor(
    readonly service: userService,
    private readonly createUserService: CreateUserService,
  ) { }

  @Post('/create')
  async createUser(@Body() body: createServiceDto) {
    const user = await this.createUserService.execute({
      name: body.name,
      companyId: body.companyId,
    });

    return user;
  }

  @Get('/find')
  async findUser(@Query() query: findUserDto) {
    const { key } = query
    const find = await this.service.findUser(key);
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
  async deleteUser(@Query() Query: deleteUserDto) {
    const { userId } = Query
    const deleteUser = await this.service.delete(userId);

    return deleteUser;
  }

  @Get('/recover')
  async recover(@Query() { companyId }: recoverUserDto) {
    const allUsers = await this.service.getAllUsers(companyId);
    return allUsers;
  }

  @Get('/allUsers')
  async recoverAllUsers(@Query() { userId }: recoverAllUsersDto) {
    const recover = await this.service.recover(userId)
    return recover
  }


  @Get('/pdf')
  async recoverForPdf(@Query() { companyId }: generatePdfDto) {
    const recoverForPdf = await this.service.recoverForPdf(companyId)
    return recoverForPdf
  }
}
