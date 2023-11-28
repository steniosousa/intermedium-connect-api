import { Module } from '@nestjs/common';
import { EpiController } from './controller/epi.controller';
import { EpiService } from './service/epi.service';

@Module({
    providers: [
        EpiService
    ],
    controllers: [EpiController],
})
export class EpiModule { }
