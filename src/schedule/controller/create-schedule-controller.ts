import { Body, Controller, Post } from '@nestjs/common';
import { CreateScheduleDto } from 'schedule/dto/create-schedule.dto';
import CreateScheduleService from 'schedule/services/create-schedule.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly service: CreateScheduleService) {}
  @Post()
  async create(@Body() data: CreateScheduleDto) {
    const createSchedule = await this.service.create(data);
    return createSchedule;
  }
}
