import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { managerController } from './controller/manager.controller';
import { managerService } from './service/manager.service';

@Module({
  controllers: [managerController],
  providers: [managerService],
  imports: [databaseModule],
})
export class managerModule {}
