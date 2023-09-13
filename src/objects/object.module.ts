import { Module } from '@nestjs/common';
import { objectController } from './controller/objects.controller';
import { objectService } from './service/object.service';

@Module({
  controllers: [objectController],
  providers: [objectService],
})
export class objectModule {}
