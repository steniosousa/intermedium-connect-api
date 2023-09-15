import { Injectable } from "@nestjs/common";
import { PrismaService } from "config/prisma.service";

@Injectable()
export default class CreateScheduleService{
    constructor(private readonly Prisma:PrismaService){}

    async create(data){
        if(!data.automated){
            const cleaning = await this.Prisma.cleaning.create({
                data: {
                  userId:data.userId,
                  placeId:data.placeId,
                  
                },
              });
              const cleaningObjects = data.objects.map((objectsId) => {
                return {
                  cleaningId: cleaning.id,
                  objectsId,
                };
              });
        
              await this.Prisma.cleaningOfObjects.createMany({
                data: cleaningObjects,
              });

            return
        }
        await this.Prisma.schedule.create({
            data: {
                placeId:data.placeId,
                eventDate:data.eventDate,
                repeatable:data.repeatable,
                responsibleId:data.responsibleId,
                objects: {
                  createMany: {
                    data: data.objects.map((id) => ({ objectId: id })),
                  },
                },
              },
        })

    }

    async find({userId}){
      try{
        const allSchedule = await this.Prisma.schedule.findMany({
          where:{
            responsibleId:userId
          },
          select:{
            id:true,
            place:true,
            eventDate:true,
            deactivatedAt:true,
            repeatable:true
          }
        })
        return allSchedule
      }
      catch(err){
        console.log(err)
      }
    }

    async edit(scheduleIds){
      try{
        scheduleIds.params.map(async (item) =>{
          const activ = await this.Prisma.schedule.findUnique({
            where:{
              id:item
            }
          })
          await this.Prisma.schedule.update({
            where:{
              id:item
            },
            data:{
              deactivatedAt:activ.deactivatedAt ? null :new Date()
            }
          })
        })
      }catch(err){
        console.log(err)
      }
    }

}