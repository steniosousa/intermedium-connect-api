import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronDatabase } from 'database/service/cron.database';

@Injectable()
export class CronService {
  constructor(private readonly database: CronDatabase) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const hoje = new Date();
    const nomesDiasSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const nomeDiaSemana = nomesDiasSemana[hoje.getDay()];

    await this.database.Started(nomeDiaSemana);
  }
}
