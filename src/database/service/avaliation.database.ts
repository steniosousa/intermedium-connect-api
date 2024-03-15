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
            throw new Error('Unable create Avaliation')
        }

    }

    async recover(userId) {
        try {
            const recover = await this.prisma.avaliation.findMany({
                where: {
                    managerId: userId,
                },
                include:{
                    EquipmentsOfAvaliation:{
                        select:{
                            equipament:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    },
                    _count:true,
                    Cleaning:{
                        select:{
                            Place:{
                                select:{
                                    name:true,
                                }
                            }
                        }
                    }

                }
            })
            return recover
        } catch {
            throw new Error('Unable recover avaliates')
        }
    }
}