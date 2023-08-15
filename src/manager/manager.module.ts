import { Module } from '@nestjs/common';
import { managerController } from './controller/manager.controller';
import { managerService } from './service/manager.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [managerController],
  providers: [managerService],
  imports: [databaseModule],
})
export class managerModule {}
