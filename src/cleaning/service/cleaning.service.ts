import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'database/service/cleaning.database';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) { }
  async create({ userId, objectsId, placeId, eventDate }) {

    const newCleaning = await this.database.create(userId, objectsId, placeId, eventDate);

    return newCleaning;
  }

  async deletionCleaning(id) {
    const deletion = await this.database.deletion(id);
    return deletion;
  }

  async findCleaning(userId: string, page: number) {
    const find: any = await this.database.findCleaning(userId, page);

    return find;
  }

  async findCleaningApp(userId: string) {
    const find: any[] = await this.database.findCleaningApp(userId);

    return find;
  }

  async updateCleaning(params) {
    const { id, Evidences, status } = params.body
    const verifyOfNull = await this.database.findCleaningWithoutEvidences(id)
    if (verifyOfNull) {
      throw new Error("Limpeza já registrada")
    }
    const update = await this.database.updateCleaning(id, Evidences, status);
    return update;
  }

  async updateStatus(body) {
    const { status, id } = body
    const updateStatus = await this.database.updateStatus(status, id)
    return updateStatus
  }



}
