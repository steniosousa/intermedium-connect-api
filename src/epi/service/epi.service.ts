import { Injectable } from "@nestjs/common";
import { EpiDatabase } from "database/service/epi.database";

@Injectable()
export class EpiService {
    constructor(private readonly database: EpiDatabase) { }

    async create(companyId: string, name: string) {
        const exist = await this.database.findEpiWithNameAndCompanyId(companyId, name)
        if (exist) {
            throw new Error('Epi alredy exist')
        }
        await this.database.create(companyId, name)
    }

    async recover(companyId: string) {
        const recover = await this.database.recover(companyId)
        return recover
    }
    async delete(episId: string) {
        const deletion = await this.database.delete(episId)
       
        return deletion
    }

    async edit(edit: string, epiId: string) {
        await this.database.edit(edit, epiId)
    }
}