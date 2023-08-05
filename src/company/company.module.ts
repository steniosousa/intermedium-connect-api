import { Module } from '@nestjs/common';
import { databaseModule } from 'src/database/database.module';
import { companyController } from './controller/company.controller';
import { companyService } from './service/company.service';

@Module({
  controllers: [companyController],
  providers: [companyService],
  imports: [databaseModule],
})
export class companyModule {}
