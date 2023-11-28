import { ManagerDatabase } from 'database/service/manager.database';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
    constructor(private readonly database: ManagerDatabase) { }

    async create({ name, email, companyId, password }) {
        function generateRandomAlphanumeric(digits: number) {
            let randomString = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;

            for (let i = 0; i < digits; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                randomString += characters.charAt(randomIndex);
            }

            return randomString;
        }
        let hashPassword;
        if (password) {
            hashPassword = await bcrypt.hash(password, 12);

        } else {
            hashPassword = await bcrypt.hash('intermedium', 12);
        }
        const hashToLogin = generateRandomAlphanumeric(6);
        const create = await this.database.create(name, email, companyId, hashPassword, hashToLogin)
        return create
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
}