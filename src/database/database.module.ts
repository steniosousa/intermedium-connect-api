import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { companyDatabase } from './service/company.database';
import { managerDatabase } from './service/manager.database';
import { UserDatabase } from './service/user.database';

@Module({
  providers: [companyDatabase, managerDatabase, UserDatabase, PrismaService],

  exports: [UserDatabase, companyDatabase, managerDatabase],
})
export class databaseModule {}
