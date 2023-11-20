import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'database/service/cleaning.database';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) {}
  async create(body) {
    if (body.objects.length == 0) {
      throw new HttpException('Error - Objetos vazios', HttpStatus.BAD_REQUEST);
    }
    const newCleaning = await this.database.create(body);

    return newCleaning;
  }

  async deletionCleaning(id) {
    const deletion = await this.database.deletion(id);
    return deletion;
  }

  async findCleaning(userId: string) {
    const find = await this.database.findCleaning(userId);

    return find;
  }

  async updateCleaning(params) {
    const update = await this.database.updateCleaning(params);
    const objectsSend = [];
    const retunrObj = {
      name: '',
      object: objectsSend,
      id: update.id,
    };

    return retunrObj;
  }
}
