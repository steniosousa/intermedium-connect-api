// startup.module.ts
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { databaseModule } from 'database/database.module';

@Module({
  providers: [CronService],
  imports:[databaseModule]
})
export class StartupModule {}
