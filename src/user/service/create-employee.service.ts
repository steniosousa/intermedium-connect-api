import { Injectable } from '@nestjs/common';
import { PrismaUsersRepository } from 'database/prisma/repositories/prisma-users.repository';
import * as bcrypt from 'bcrypt';

export interface CreateUserServiceParams {
  name: string;
  companyId: string;
}

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: PrismaUsersRepository) { }

  private generateRandomAlphanumeric(digits: number) {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < digits; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  async execute(params: CreateUserServiceParams) {
    const { name } = params;
    const hashPassword = await bcrypt.hash('intermedium', 12);
    const hashToLogin = this.generateRandomAlphanumeric(6);

    const newUser = await this.usersRepository.create({
      name,
      role: 'EMPLOYEE',
      password: hashPassword,
      loginHash: hashToLogin,
      userForCompany: {
        create: {
          companyId: params.companyId
        },
      },
      createdAt: new Date(),
    });
    return newUser
  }
}
