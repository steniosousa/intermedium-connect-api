import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ManagerDatabase } from '@/database/service/manager.database';
import { EmailService } from '@/Email/service/email.service';

@Injectable()
export class ManagerService {
  constructor(
    private readonly database: ManagerDatabase,
    private readonly email: EmailService,
  ) {}

  async create({ email, companyId, role, permissions, name }:{ email:string, companyId:string[], role:string, permissions:string[], name:string }) {
    const create = await this.database.create(
      email,
      companyId,
      role,
      permissions,
      name,
    );
    await this.email.createUser(email, create.id, name);
    return create;
  }

  async recoverPass(email: string) {
    const dados:any = await this.database.findWithEmail(email);
    await this.email.recoverPass(email, dados.id, dados.name);
  }

  async find(email: string, password: string) {
    const login = await this.database.find(email, password);
    if (!login) {
      throw new HttpException(
        'Error - Unable to login admin',
        HttpStatus.BAD_REQUEST,
      );
    }
    return login;
  }

  async edit(datas:any) {
    if (datas.password) {
      const hashPassword = await bcrypt.hash(datas.password, 12);
      datas['password'] = hashPassword;
    }
    const edit = await this.database.edit(datas);
    return edit;
  }

  async resetPass(password:string, id:string){
    const hashPassword = await bcrypt.hash(password, 12);
    const edit = await this.database.resetPass(hashPassword,id);
    return edit;
  }

  async recover(companyId:string) {
    const recover = await this.database.recover(companyId);
    return recover;
  }
}
