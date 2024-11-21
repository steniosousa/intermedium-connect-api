import { CleaningDatabase } from '@/database/service/cleaning.database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) {}
  async create({ userId, objectsId, placeId, eventDate }:any) {
    const newCleaning = await this.database.create(
      userId,
      objectsId,
      placeId,
      eventDate,
    );

    return newCleaning;
  }

  async deletionCleaning(id:string) {
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

  async updateCleaning(params:any) {
    const { id, Evidences, status } = params;
    const verifyOfNull = await this.database.findCleaningWithoutEvidences(id);
    console.log(id, Evidences)

    if (verifyOfNull) {
      throw new HttpException(
        'Error - Limpeza já registrada',
        HttpStatus.BAD_REQUEST,
      );
    }
    const update = await this.database.updateCleaning(id, Evidences, status);
    return;
  }

  async updateStatus(body:any) {
    const { status, id } = body;
    const updateStatus = await this.database.updateStatus(status, id);
    return updateStatus;
  }
}
