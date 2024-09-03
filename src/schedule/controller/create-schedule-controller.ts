import {
  Body,
  Controller,
  Post,
  Delete,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import CreateScheduleService from '../services/create-schedule.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { DeleteScheduleDto } from '../dto/delete-schedule.dto';
import { recoverScheduleDto } from '../dto/recover.schedule';

@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly service: CreateScheduleService) {}

  @Post('/create')
  async create(@Body() data: CreateScheduleDto) {
    const createSchedule = await this.service.create(data);
    return createSchedule;
  }

  @Delete('/delete')
  async delete(@Query() query: DeleteScheduleDto) {
    const { scheduleId } = query;
    await this.service.delete(scheduleId as string);
  }

  @Get('/recover')
  async recover(@Query() { userId }: recoverScheduleDto) {
    const all = await this.service.recover(userId as string);
    return all;
  }

  @Post('/edit')
  async edit(@Body() { scheduleId }: DeleteScheduleDto) {
    await this.service.edit(scheduleId);
  }
}
