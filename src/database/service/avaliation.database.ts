import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AvaliationDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async create(episId, managerId, observation, status, scheduleId) {
        try {
            await this.prisma.avaliation.create({
                data: {
                    status,
                    managerId,
                    observation,
                    EquipmentsOfAvaliation: {
                        createMany: {
                            data: episId.map((item: string) => ({ equipamentId: item }))
                        }
                    },
                    Cleaning: {
                        connect: {
                            id: scheduleId
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error('Unable create Avaliation')
        }

    }

    async recover(userId) {
        try {
            const recover = await this.prisma.cleaning.findMany({
                where: {
                    userId,
                    AND: {
                        status: 'CONCLUIDO'
                    }
                },
                select: {
                    avaliation: {
                        include: {
                            EquipmentsOfAvaliation: {
                                select: {
                                    equipament: true
                                }
                            }
                        }
                    },
                    Place: true,
                    ObjectOfCleaning: {
                        select: { object: true }
                    },
                    status: true,
                    _count: true,
                    createdAt: true,

                },
                orderBy: {
                    createdAt: "asc"
                }
            })
            return recover
        } catch {
            throw new Error('Unable recover avaliates')
        }
    }
}