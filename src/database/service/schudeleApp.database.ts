import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class scheduleAppDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async create(Evidences) {
        try {
            await this.prisma.cleaning.update({
                where: {
                    id:Evidences[0].id
                },
                data: {
                    evidences: {
                        createMany: {
                            data: Evidences.map((item) => ({

                                evidenceUrl: item.evidenceUrl,
                                type: item.type,
                                createdAt: new Date()

                            }))
                        }
                    },
                    status: "CONCLUIDO"
                }
            })

        } catch (error) {
            throw new Error('Error - Error when save evidences')
        }
    }
}