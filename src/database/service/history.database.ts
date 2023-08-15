import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class historyDatabase {
  constructor(private readonly prisma: PrismaService) {}
  async findHistory(userId) {
    try {
      const history = await this.prisma.cleaning.findMany({
        where: {
          userId,
          status: 'Finalizado',
        },
      });
      return history;
    } catch (error) {
      console.log(error);
    }
  }
}