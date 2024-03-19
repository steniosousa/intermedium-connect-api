import { Injectable } from "@nestjs/common"
import { TruckDatabase } from "database/service/truck.database"
@Injectable()
export class truckService {
    constructor(readonly database: TruckDatabase) { }

    async start(plate: string, lat: number, lng: number) {
        const cords = await this.database.startMonitoring(plate, lat, lng)
        return cords
    }

    async recoverTrucks() {
        const recover = await this.database.recover()
        return recover
    }

    async getCoords(plate){
        const recoverCoords = await this.database.recoverCoords(plate)

        return recoverCoords 
    }
}