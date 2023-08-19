import { Injectable } from '@nestjs/common';
import { companyDatabase } from 'database/service/company.database';

@Injectable()
export class companyService {
  constructor(private readonly database: companyDatabase) {}

  async createCompany(name: string) {
    const createCompany = await this.database.createCompany(name);
    return createCompany;
  }

  async findCompany(name: string) {
    const find = await this.database.findCompany(name);
    return find;
  }

  async allCompanys(){
    const allCompanys = await this.database.allCompanys();
    return allCompanys
  }

  async deleteCompany(name: string) {
    const deleteCompany = await this.database.deleteCompany(name);
    return deleteCompany;
  }
}
