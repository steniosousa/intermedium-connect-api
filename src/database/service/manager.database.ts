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
                    companyId,
                    password: hashPassword,
                    loginHash: hashToLogin,
                    role: 'MANAGER',

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
                    companyId: true,
                    password: true
                }
            })
            const hashPassword = bcrypt.compareSync(password, pass.password);

            if (hashPassword) {
                const retunrUser = {
                    id: pass.id,
                    companyId: pass.companyId
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
}