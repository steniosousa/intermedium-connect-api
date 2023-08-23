import { Injectable } from "@nestjs/common";
import { PlaceDatabase } from "database/service/place.database";

@Injectable()
export class PlaceService{
    constructor(private readonly database:PlaceDatabase){}
    async createPlace(body){
        const {name, companyId} = body
        const save = await this.database.createPlace(name, companyId)
        return save
    }

    async findPlaces(body){
        const {companyId} = body
        const findAll = await this.database.findAllPlaces(companyId)
        return findAll
    }
}