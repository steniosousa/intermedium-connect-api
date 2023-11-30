import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async create(name, email, companyId, hashPassword, hashToLogin) {
        try {
            await this.prisma.user.create({
                data: {
                    name,
                    email,
                    userForCompany: {
                        createMany: {
                            data: companyId.map((item) => ({  companyId: item  }))
                        }
                    },
                    password: hashPassword,
                    loginHash: hashToLogin,
                    role: 'MANAGER',
                    firstAcess: true

                }
            })
        } catch (error) {
            throw new HttpException(
                'Error - Unable to create admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async find(email, password) {
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
                    userForCompany: true
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
                    firstAcess: pass.firstAcess
                }
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
        delete datas.codigo;
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

    async recover(userId) {
        try {
            const recover = await this.prisma.user.findMany({
                where: {
                    id: userId
                },
            })
            return recover
        } catch (error) {
            throw new HttpException(
                'Error - Unable to found admin',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
