import { Module } from '@nestjs/common';
import { AvaliationController } from './controller/avaliation.controller';
import { AvaliationService } from './service/avalition.service';

@Module({
    controllers: [AvaliationController],
    providers: [AvaliationService],
})
export class AvaliationModule { }
