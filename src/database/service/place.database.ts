import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "config/prisma.service";

@Injectable()
export class PlaceDatabase{
    constructor (private readonly prisma: PrismaService){}
    async createPlace(name, companyId){
        try{
            const save = await this.prisma.place.create({
                data:{
                    name,
                    companyId
                }
            })
            return save
        }
        catch{
            throw new HttpException(
                'Error - Erro ao cadastrar ambiente',
                HttpStatus.BAD_REQUEST,
              ); 
        }

    }
}