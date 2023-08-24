// startup.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronDatabase } from 'database/service/cron.database';
const cron = require("node-cron");

@Injectable()
export class CronService implements OnModuleInit {
    constructor(private readonly database:CronDatabase){}
  onModuleInit() {
    const hoje = new Date();
    const nomesDiasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const nomeDiaSemana = nomesDiasSemana[hoje.getDay()];

    
    cron.schedule("0 0 * * *", async () => {
        await this.database.Started(nomeDiaSemana)
    });
  }
}
