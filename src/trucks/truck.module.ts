import { Module } from '@nestjs/common';
import { truckController } from './controller/controller';
import { truckService } from './service/service';

@Module({
    controllers: [truckController],
    providers: [truckService],
})
export class TruckModule { }
