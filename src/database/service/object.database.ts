import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class objectDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async createObject(name: string, companyId: string) {
        try {
            const newObj = await this.prisma.object.create({
                data: {
                    name,
                    companyId,

                }
            });
            return newObj;
        } catch {
            throw new HttpException(
                'Error - Erro ao cadastrar objeto',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findWithName(name, companyId) {
        try {
            const object = await this.prisma.object.findFirst({
                where: {
                    name,
                    companyId
                },
            });
            return object;
        } catch {
            throw new HttpException(
                'Error - Error when fetching object',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findObjects(companyId: string) {

        try {
            const objects = await this.prisma.object.findMany({
                where: {
                    companyId,
                },
                select: {
                    id: true,
                    name: true
                }
            });
            return objects;
        } catch {
            throw new HttpException(
                'Error - Erro ao buscar objetos',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteobj(objectId: string) {
        try {
            const deleteObj = await this.prisma.object.delete({
                where: {
                    id: objectId,
                },
            });
            return deleteObj;
        } catch {
            throw new HttpException(
                'Error - Erro ao deletar objeto',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async objectInUse(id: string) {
        try {
            const object = await this.prisma.cleaning.findFirst({
                where: {
                    ObjectOfCleaning: {
                        some: {
                            objectId: id
                        }
                    }
                },
            });
            return object;
        } catch {
            throw new HttpException(
                'Error - Error retrieving object',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateObject(id: string, name: string) {
        try {
            await this.prisma.object.update({
                where: {
                    id
                },
                data: {
                    name,
                }
            })
        } catch (error) {
            let message = 'Unexpected error'
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}
