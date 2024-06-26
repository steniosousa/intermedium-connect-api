import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async create(email, companyId, role, permissions, name) {
        try {
            const createUser = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    userForCompany: {
                        createMany: {
                            data: companyId.map((item) => ({ companyId: item }))
                        }
                    },
                    password: "",
                    role,
                    firstAcess: true,
                    PermissionsForUsers: {
                        createMany: { data: permissions.map((item: string) => ({ Permission: item })) }
                    }

                }
            })
            return createUser
        } catch (error) {
            throw new HttpException(
                'Error - Unable to create admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async find(email: string, password: string) {
        try {
            const pass = await this.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    password: true,
                    name: true,
                    role: true,
                    email: true,
                    firstAcess: true,
                    userForCompany: true,
                    PermissionsForUsers: true,
                    deactivatedAt: true,
                }
            })
            const hashPassword = bcrypt.compareSync(password, pass.password);
            if (hashPassword) {
                const retunrUser = {
                    id: pass.id,
                    companyId: pass.userForCompany,
                    name: pass.name,
                    role: pass.role,
                    email: pass.email,
                    firstAcess: pass.firstAcess,
                    permissions: pass.PermissionsForUsers,
                    deactivatedAt: pass.deactivatedAt,
                }
                if (pass.role == "EMPLOYEE") throw new Error('Usuário somente de aplicativo')
                return retunrUser
            }
            throw new Error('User not Found')

        } catch (error) {
            throw new HttpException(
                'Error - Unable to find admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async edit(datas) {
        try {
            return await this.prisma.user.update({
                where: {
                    id: datas.id
                },
                data: datas
            })
        } catch (error) {
            throw new HttpException(
                'Error - Unable to update admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async recover(companyId) {
        try {
            const recover = await this.prisma.user.findMany({
                where: {
                    role: {
                        not: 'EMPLOYEE'
                    },
                    userForCompany: {
                        some: {
                            companyId
                        }
                    }
                }, select: {
                    name: true,
                    id: true,
                    role: true,

                }
            })
            return recover
        } catch (error) {
            throw new HttpException(
                'Error - Unable to found admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findWithEmail(email: string) {
        try {
            const pass = await this.prisma.user.findUnique({
                where: { email },
                select: {
                    id:true,
                    name:true
                }
            })
            return pass
        } catch {
            throw new HttpException(
                'Error - Erro ao recuperar usuário',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
