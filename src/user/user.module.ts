import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller';
import { userService } from './service/user.service';

@Module({
  controllers: [userController],
  providers: [userService],
})
export class UserModule {}
