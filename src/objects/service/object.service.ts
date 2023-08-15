import { Injectable } from '@nestjs/common';
import { objectDatabase } from 'database/service/object.database';

@Injectable()
export class objectService {
  constructor(private readonly database: objectDatabase) {}
  async createObject(name: string, companyId: string) {
    const newObject = await this.database.createObject(name, companyId);
    return newObject;
  }

  async findObjects(companyId: string) {
    const allObjects = await this.database.findObjects(companyId);
    return allObjects;
  }

  async deleteObject(objectId: string) {
    const deleteObj = await this.database.deleteobj(objectId);
    return deleteObj;
  }
}
