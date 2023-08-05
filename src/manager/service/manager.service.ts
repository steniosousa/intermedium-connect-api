import { Injectable } from '@nestjs/common';
import { managerDatabase } from 'src/database/service/manager.database';

@Injectable()
export class managerService {
  constructor(readonly database: managerDatabase) {}
  async createManager(name: string, companyId: string, password: string) {
    const cretaeManagerDatabase = await this.database.createNewManager(
      name,
      companyId,
      password,
    );
    return cretaeManagerDatabase;
  }

  async findManager(name: string, password: string) {
    const findManager = await this.database.authenticateManager(name, password);

    return findManager;
  }

  async updateManager(query: any) {
    const updateManager = await this.database.updateManager(query);
    return updateManager;
  }

  async deleteManager(managerId: string) {
    const deleteManager = await this.database.deleteUser(managerId);
    return deleteManager;
  }
}
