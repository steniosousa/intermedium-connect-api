import { Injectable } from '@nestjs/common';
import { objectDatabase } from 'src/database/service/object.database';

@Injectable()
export class objectService {
  constructor(private readonly database: objectDatabase) {}
  async createObject(name: string, companyId: string) {
    const newObject = await this.database.createObject(name, companyId);
    return newObject;
  }

  async deleteObject(objectId: string) {
    const deleteObj = await this.database.deleteobj(objectId);
    return deleteObj;
  }
}
