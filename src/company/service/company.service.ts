import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { companyDatabase } from 'database/service/company.database';

@Injectable()
export class companyService {
  constructor(private readonly database: companyDatabase) { }

  async createCompany(name: string) {
    const verify = await this.database.findCompany(name)
    if (verify) {
      throw new HttpException(
        'Error - Company already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createCompany = await this.database.createCompany(name);
    return createCompany;
  }

  async findCompany(name: string) {
    const find = await this.database.findCompany(name);
    return find;
  }

  async allCompanys() {
    const allCompanys = await this.database.allCompanys();
    return allCompanys;
  }

  async deleteCompany(companyId: string) {
    const deleteCompany = await this.database.deleteCompany(companyId);
    return deleteCompany;
  }

  async recoverCompanies(managerId: string) {
    const recover = await this.database.recoverCompanies(managerId)
    return recover
  }

  async updateCompany(id: string, name: string) {
    const update = await this.database.updateCompany(id, name)
    return update
  }
}
