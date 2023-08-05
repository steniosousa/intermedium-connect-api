import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createCompanyDto } from '../dto/createCompany.dto';
import { deleteCompanyDto } from '../dto/deleteCompany.dto';
import { findCompanyDto } from '../dto/findCompany.dto';
import { companyService } from '../service/company.service';

@Controller('/company')
export class companyController {
  constructor(readonly service: companyService) {}
  @Post('/')
  async createCompany(@Body() body: createCompanyDto) {
    const { name } = body;
    const create = await this.service.createCompany(name);
    return create;
  }

  @Get('')
  async findCompany(@Query() query: findCompanyDto) {
    const { name } = query;
    const find = await this.service.findCompany(name);
    return find;
  }

  @Delete('/delete')
  async deleteCompany(@Body() body: deleteCompanyDto) {
    const { name } = body;
    const deleteUser = await this.service.deleteCompany(name);
    return deleteUser;
  }
}
