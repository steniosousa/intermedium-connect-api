import { Module } from '@nestjs/common';
import { ObjectService } from './service/object.service';
import { ObjectController } from './controller/object.controller';

@Module({
  providers: [
    ObjectService
  ],
  controllers: [ObjectController],
})
export class ObjectModule {}
