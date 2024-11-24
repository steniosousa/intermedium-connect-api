import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class HistoryDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async recover(userId: string) {
    try {
      const recover = await this.prisma.cleaning.findMany({
        where: {
          userId,
          AND: {
            deletedAt: {
              equals: null,
            },
            status: {
              equals: 'CONCLUIDO',
            },
          },
        },
        select: {
          ObjectOfCleaning: {
            select: {
              object: true,
            },
          },
          evidences: true,
          avaliation: true,
          Place: true,
          createdAt: true, // Retorna a data de criação
          id: true,
          updatedAt: true, // Retorna a data de atualização
        },
      });
      
      // Formatação das datas após o retorno dos dados
      const formattedRecover = recover.map(item => ({
        ...item,
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
          : null, // Formata a data de criação
        updatedAt: item.updatedAt
          ? new Date(item.updatedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
          : null, // Formata a data de atualização
      }));
      
      return formattedRecover;
      
    } catch (error) {
      let message = 'Error to recover history';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }
}
