import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createCompanyDto } from '../dto/createCompany.dto';
import { deleteCompanyDto } from '../dto/deleteCompany.dto';
import { findCompanyDto } from '../dto/findCompany.dto';
import { companyService } from '../service/company.service';

@Controller('/companies')
export class companyController {
  constructor(readonly service: companyService) {}

  @Post('/create')
  async createCompany(@Body() body: createCompanyDto) {
    const { name } = body;
    const create = await this.service.createCompany(name);
    return create;
  }

  @Get('/find')
  async findCompany(@Query() query: findCompanyDto) {
    const { name } = query;
    const find = await this.service.findCompany(name);
    return find;
  }

  @Get('/recover')
  async getCompanys() {
    const allCompanys = await this.service.allCompanys();
    return allCompanys;
  }

  @Delete('/delete')
  async deleteCompany(@Query() query: deleteCompanyDto) {
    const { companyId } = query;
    const deleteUser = await this.service.deleteCompany(companyId);
    return deleteUser;
  }
}
