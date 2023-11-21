import { Body, Controller, Post, Delete, Query } from '@nestjs/common';
import { CreateScheduleDto } from 'schedule/dto/create-schedule.dto';
import { DeleteScheduleDto } from 'schedule/dto/delete-schedule.dto';
import CreateScheduleService from 'schedule/services/create-schedule.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly service: CreateScheduleService) { }

  @Post('/create')
  async create(@Body() data: CreateScheduleDto) {
    const createSchedule = await this.service.create(data);
    return createSchedule;
  }

  @Delete('/delete')
  async delete(@Query() query: DeleteScheduleDto) {
    const { scheduleId } = query
    await this.service.delete(scheduleId as string)

  }
}
