import { Injectable } from "@nestjs/common";
import { PrismaService } from "config/prisma.service";

@Injectable()
export class CronDatabase{
    constructor (private readonly prisma:PrismaService){}
    async Started(day: string) {
        const existingCleanings = await this.prisma.cleaning.findMany({
          where: {
            cron: day
          }
        });
      
        const updatedCleanings = [];
      
        for (const cleaning of existingCleanings) {
            const horaInteira = parseInt(cleaning.cronHors, 10);
          
            const currentCronHors = new Date();
            currentCronHors.setUTCHours(horaInteira, 0, 0, 0);
            if(cleaning.repeat){
                const updatedCleaning = await this.prisma.cleaning.create({
                   data:{
                    where:cleaning.where,
                    createAt:currentCronHors.toISOString(),
                    cron:'Hoje',
                    cronHors:currentCronHors.toISOString(),
                    entrance:'',
                    exit:'',
                    userId:cleaning.userId,
                    obs1:'',
                    obs2:'',
                    obs3:'',
                    status:'Pendente',
                    updateAt:currentCronHors.toISOString(),
                    repeat:false,
                   }
                  });
                  const objects = await this.prisma.cleaningOfObjects.findMany({
                    where:{
                        id:cleaning.id
                    }
                })
                for(const newObject of objects){
                    await this.prisma.cleaningOfObjects.create({
                        data:{
                            cleaningId:updatedCleaning.id,
                            objectsId:newObject.objectsId,
                            createAt:currentCronHors.toISOString(),
                        }
                    })
                }
                  continue
            }
            else{
                await this.prisma.cleaning.update({
                    where: {
                      id: cleaning.id
                    },
                    data: {
                      cron:'Hoje'
                    }
                  });
                  continue
            }
        }

       
      
        return updatedCleanings;
      }
}