import { ManagerDatabase } from 'database/service/manager.database';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailService } from 'Email/service/email.service';

@Injectable()
export class ManagerService {
    constructor(private readonly database: ManagerDatabase, private readonly email: EmailService) { }

    async create({ email, companyId, role, permissions, name }) {
        const create = await this.database.create(email, companyId, role, permissions, name)
        await this.email.createUser(email, create.id, name)
        return create
    }

    async recoverPass(email: string) {
        const { id, name } = await this.database.findWithEmail(email)
        await this.email.recoverPass(email, id, name)
    }

    async find(email: string, password: string) {
        const login = await this.database.find(email, password)
        if (!login) {
            throw new HttpException(
                'Error - Unable to login admin',
                HttpStatus.BAD_REQUEST,
            );
        }
        return login
    }

    async edit(datas) {
        if (datas.password) {
            const hashPassword = await bcrypt.hash(datas.password, 12);
            datas['password'] = hashPassword
        }
        const edit = await this.database.edit(datas)
        return edit
    }

    async recover(companyId) {
        const recover = await this.database.recover(companyId)
        return recover
    }
}