import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller';
import { userService } from './service/user.service';
import { CreateUserService } from './service/create-employee.service';
import { DeleteUserService } from './service/delete-user.service';

@Module({
  controllers: [userController],
  providers: [userService, CreateUserService, DeleteUserService],
})
export class UserModule {}
