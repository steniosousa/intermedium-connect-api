import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'database/service/cleaning.database';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) { }
  async create({ userId, objectsId, placeId,eventDate }) {

    const newCleaning = await this.database.create(userId, objectsId, placeId, eventDate );

    return newCleaning;
  }

  async deletionCleaning(id) {
    const deletion = await this.database.deletion(id);
    return deletion;
  }

  async findCleaning(userId: string) {
    const find: any[] = await this.database.findCleaning(userId);

    return find;
  }

  async updateCleaning(params) {
    const update = await this.database.updateCleaning(params);
    return update;
  }



}
