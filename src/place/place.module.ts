import { Module } from '@nestjs/common';
import { PlaceController } from './controller/place.controller';
import { PlaceService } from './service/place.service';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
