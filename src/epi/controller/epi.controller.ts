import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { EpiService } from '../service/epi.service';
import { createEpiDto } from '../dto/create.epi.dto';
import { recoverEpiDto } from '../dto/recover.epi';
import { deleteEpiDto } from '../dto/delete.epi.dto';
import { editEpiDto } from '../dto/edit.epi.dto';

@Controller('/epis')
export class EpiController {
  constructor(private readonly service: EpiService) {}

  @Post('/create')
  async create(@Body() body: createEpiDto) {
    const { companyId, name } = body;
    const createEpi = await this.service.create(companyId, name);
    return createEpi;
  }
  @Get('/recover')
  async recover(@Query() { companyId }: recoverEpiDto) {
    const recover = await this.service.recover(companyId);
    return recover;
  }

  @Delete('/delete')
  async delete(@Query() { episId }: deleteEpiDto) {
    const deleteEpi = await this.service.delete(episId);

    return deleteEpi;
  }

  @Post('/update')
  async edit(@Body() { name, id }: editEpiDto) {
    await this.service.edit(name, id);
  }
}
