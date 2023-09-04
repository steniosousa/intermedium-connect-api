import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers:[],
  providers: [CronService],
  imports:[databaseModule]
})
export class StartupModule {}
