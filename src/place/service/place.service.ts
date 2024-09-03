import { PlaceDatabase } from '@/database/service/place.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceService {
  constructor(private readonly database: PlaceDatabase) {}
  async createPlace(body:{name:string, companyId:string}) {
    const { name, companyId } = body;
    const save = await this.database.createPlace(name, companyId);
    return save;
  }

  async findPlaces(companyId: string) {
    const findAll = await this.database.findAllPlaces(companyId);
    return findAll;
  }

  async updatePlace(id:string, name:string) {
    const updatePlace = await this.database.updatePlace(id, name);
    return updatePlace;
  }

  async deletePlace(id:string) {
    const verifyInUse = await this.database.placeInUse(id);
    if (verifyInUse) {
      return 'Place in use';
    }
    const deletePlace = await this.database.deletePlace(id);
    return deletePlace;
  }
}
