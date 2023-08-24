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

            if(cleaning.count == 1){
                const updatedCleaning = await this.prisma.cleaning.update({
                    where: {
                      id: cleaning.id
                    },
                    data: {
                      cron: 'Hoje',
                      cronHors: currentCronHors.toISOString(),
                      count:2
                    }
                  });
                  updatedCleanings.push(updatedCleaning);
                  continue
            }
            else if(cleaning.count == 2){
                const updatedCleaning = await this.prisma.cleaning.update({
                    where: {
                      id: cleaning.id
                    },
                    data: {
                      status:'Finalizado'
                    }
                  });
                  updatedCleanings.push(updatedCleaning);
                  continue
            }
            else{
                const updatedCleaning = await this.prisma.cleaning.update({
                  where: {
                    id: cleaning.id
                  },
                  data: {
                    cron: 'Hoje',
                    cronHors: currentCronHors.toISOString()
                  }
                });
              
                updatedCleanings.push(updatedCleaning);
            }
          
          }
      
        return updatedCleanings;
      }
}