import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'database/service/cleaning.database';
const cron = require("node-cron");
const schedule = require('node-schedule');

@Injectable()
export class cleaningService {
  constructor(private readonly database: CleaningDatabase) {}
  async create(body) {
    if(body.objects.length == 0){
      throw new HttpException(
        'Error - Objetos vazios',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCleaning = await this.database.create(body);

    return newCleaning;
  }
  async deletionCleaning(id) {
    const deletion = await this.database.deletion(id);
    return deletion;
  }

  async findCleaning(userId: string) {
    const find: any[] = await this.database.findCleaning(userId);
    const locations = {};

    for (const clear of find) {
      for (const item of clear) {
        if (item.cleaning.status == 'Finalizado') {
          continue;
        }
        const locationName = item.cleaning.where;
        const objectName = item.object.name;
        const status = item.cleaning.status;
        const createAt = item.cleaning.createAt;

        if (locations[locationName]) {
          locations[locationName].object.push(objectName);
        } else {
          locations[locationName] = {
            name: locationName,
            object: [objectName],
            status,
            createAt,
            id: item.cleaning.id,
          };
        }
      }
    }

    const groupedResults = Object.values(locations);

    return groupedResults;
  }

  async updateCleaning(params) {
    const update = await this.database.updateCleaning(params);
    const objectsSend = [];
    const retunrObj = {
      name: update.where,
      object: objectsSend,
      status: update.status,
      createAt: update.createAt,
      id: update.id,
    };
    for (const objects of update.objects) {
      objectsSend.push(objects.object.name);
    }

    return retunrObj;
  }

  async createCron(body){
    const {daySelected, userId, objects, where,horsSelected,repeat,continueCron} = body
    const dateSplit = horsSelected.split('')
    const dateCron = `${dateSplit[0]} ${dateSplit[1]} * * ${daySelected}`
   
    if(objects.length == 0){
      throw new HttpException(
        'Error - Objetos vazios',
        HttpStatus.BAD_REQUEST,
      );
    }

    if(repeat == true){
       const repetition =  cron.schedule(dateCron, async () => {
          await this.database.create(body);
        });

        if(continueCron == true){
          repetition.stop()
        }
      }
    else{
      const job = schedule.scheduleJob(dateCron, async function(){
        await this.database.create(body);
        job.cancel()
      });
    }
    
  }
}
