import { Injectable } from '@nestjs/common';
import { PrismaService } from 'config/prisma.service';

@Injectable()
export class CronDatabase {
  constructor(private readonly prisma: PrismaService) {}
  async Started(day: string) {
    
    const updatedCleanings = [];



    return updatedCleanings;
  }
}
