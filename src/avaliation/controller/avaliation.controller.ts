import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AvaliationService } from '../service/avalition.service';
import { createAvaliationDto } from '../dto/create.avaliation';
import { recoverAvaliationDto } from '../dto/recover.avaliation';

@Controller('/avaliation')
export class AvaliationController {
  constructor(private readonly service: AvaliationService) {}

  @Post('/create')
  async create(@Body() body: createAvaliationDto) {
    const { episId, managerId, observation, status, scheduleId } = body;
    await this.service.create(
      episId,
      managerId,
      observation,
      status,
      scheduleId,
    );
  }

  @Get('/recover')
  async recover(@Query() { userId }: recoverAvaliationDto) {
    const recover = await this.service.recover(userId);
    return recover;
  }
}
