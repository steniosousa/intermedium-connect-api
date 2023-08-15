import { Module } from '@nestjs/common';
import { companyController } from './controller/company.controller';
import { companyService } from './service/company.service';
import { databaseModule } from 'database/database.module';

@Module({
  controllers: [companyController],
  providers: [companyService],
  imports: [databaseModule],
})
export class companyModule {}
