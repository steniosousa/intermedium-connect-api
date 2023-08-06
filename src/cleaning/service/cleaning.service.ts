import { Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'src/database/service/cleaning.database';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) { }
  async create(body) {
    const newCleaning = await this.database.create(body);
    return newCleaning;
  }

  async findCleaning(userId: string) {
    const find: any[] = await this.database.findCleaning(userId);
    const locations = {};

    for (const clear of find) {
      for (const item of clear) {
        const locationName = item.cleaning.where;
        const objectName = item.object.name;
        const status = item.cleaning.status;
        const createAt = item.cleaning.createAt;

        if (locations[locationName]) {
          locations[locationName].object.push(objectName);
        } else {
          locations[locationName] = {
            name: locationName,
            object: [objectName],
            status,
            createAt,
            id: item.cleaning.id,
          };
        }
      }
    }

    const groupedResults = Object.values(locations);

    return groupedResults;
  }

  async updateCleaning(params) {
    const update = await this.database.updateCleaning(params);
    const objectsSend = [];
    const retunrObj = {
      name: update.where,
      object: objectsSend,
      status: update.status,
      createAt: update.createAt,
      id: update.id,
    };
    for (const objects of update.objects) {
      objectsSend.push(objects.object.name);
    }

    return retunrObj;
  }
}
