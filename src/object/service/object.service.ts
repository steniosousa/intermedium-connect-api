import { Injectable } from "@nestjs/common";
import { objectDatabase } from "database/service/object.database";

@Injectable()
export class ObjectService {
    constructor(private readonly idatabase: objectDatabase) { }

    async create(name, companyId) {
        try {
            const verify = await this.idatabase.findWithName(name, companyId)
            if (verify) {
                throw new Error('Already existing object')
            }
            const createObjct = await this.idatabase.createObject(name, companyId)
            return createObjct

        } catch (error) {
            let messager = 'Unable to save object';
            if (error instanceof Error) {
                messager = error.message
            }
            throw new Error(messager)

        }
    }

    async recover(companyId: string) {
        try {
            const foundObjects = await this.idatabase.findObjects(companyId)

            return foundObjects

        } catch (error) {
            let messager = 'Unable to found all objects';
            if (error instanceof Error) {
                messager = error.message
            }
            throw new Error(messager)

        }
    }

    async delete(objectId: string) {
        try {
            const verify = await this.idatabase.objectInUse(objectId)
            if (verify) {
                throw new Error('Object In Use')
            }
            const foundObjects = await this.idatabase.deleteobj(objectId)
            return foundObjects

        } catch (error) {
            let messager = 'Unable to delete object';
            if (error instanceof Error) {
                messager = error.message
            }
            throw new Error(messager)

        }
    }

    async update(id:string, name:string){
        try {
            const foundObjects = await this.idatabase.updateObject(id, name)
            return foundObjects

        } catch (error) {
            let messager = 'Unable to delete object';
            if (error instanceof Error) {
                messager = error.message
            }
            throw new Error(messager)

        }
    }
}