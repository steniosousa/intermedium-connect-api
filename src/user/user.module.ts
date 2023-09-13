import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller';
import { userService } from './service/user.service';
import { DatabaseModule } from 'database/database.module';

@Module({
  controllers: [userController],
  providers: [userService],
  imports: [DatabaseModule],
})
export class userModule {}
