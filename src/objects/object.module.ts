import { Module } from '@nestjs/common';
import { objectController } from './controller/objects.controller';
import { objectService } from './service/object.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [objectController],
  providers: [objectService],
  imports: [databaseModule],
})
export class objectModule {}
