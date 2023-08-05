import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { userController } from './controller/user.controller';
import { userService } from './service/user.service';

@Module({
  controllers: [userController],
  providers: [userService],
  imports: [databaseModule],
})
export class userModule {}
