import { Injectable } from '@nestjs/common';
import { PlaceDatabase } from 'database/service/place.database';

@Injectable()
export class PlaceService {
  constructor(private readonly database: PlaceDatabase) { }
  async createPlace(body) {
    const { name, companyId } = body;
    const save = await this.database.createPlace(name, companyId);
    return save;
  }

  async findPlaces(companyId: string) {
    const findAll = await this.database.findAllPlaces(companyId);
    return findAll;
  }

  async updatePlace(id, name) {
    const updatePlace = await this.database.updatePlace(id, name)
    return updatePlace
  }

  async deletePlace(id) {
    const verifyInUse = await this.database.placeInUse(id)
    if (verifyInUse) {
      return 'Place in use'
    }
    const deletePlace = await this.database.deletePlace(id)
    return deletePlace
  }
}
