import { Module } from '@nestjs/common';
import { companyController } from './controller/company.controller';
import { companyService } from './service/company.service';

@Module({
  controllers: [companyController],
  providers: [companyService],
})
export class companyModule {}
