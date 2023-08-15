import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller';
import { userService } from './service/user.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [userController],
  providers: [userService],
  imports: [databaseModule],
})
export class userModule {}
