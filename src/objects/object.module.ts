import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { objectController } from './controller/objects.controller';
import { objectService } from './service/object.service';

@Module({
  controllers: [objectController],
  providers: [objectService],
  imports: [databaseModule],
})
export class objectModule {}
