import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class HistoryDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async recover(userId: string) {
        try {
            const recover = await this.prisma.cleaning.findMany({
                where: {
                    userId,
                    AND: {
                        deletedAt: {
                            equals: null
                        },
                        status: {
                            equals: 'CONCLUIDO'
                        }
                    },

                },
                select: {
                    ObjectOfCleaning: {
                        select: {
                            object: true
                        }
                    },
                    evidences: true,
                    avaliation: true,
                    Place: true,
                    createdAt: true,
                    id: true,
                    updatedAt: true

                }
            })
            return recover
        } catch (error) {
            let message = "Error to recover history"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }

}