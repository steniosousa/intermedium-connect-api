import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CleaningDatabase } from 'database/service/cleaning.database';
import { UserDatabase } from 'database/service/user.database';

@Injectable()
export class userService {
  constructor(private readonly database: UserDatabase,
    readonly databaseCleaning: CleaningDatabase) { }

  async findUserWithNameAndPass(params) {
    const { userId, password } = params;
    const findUser = await this.database.findUserWithNameAndPassword(
      userId,
      password,
    );
    return findUser;
  }

  async findUser(key: string) {

    const findUser = await this.database.authenticateUser(key);
    return findUser;
  }

  async updateUser(params) {
    const { id } = params;

    const indentify = await this.database.findUser(id)
    if (!indentify) {
      throw new HttpException(
        'Error - User not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateUser = await this.database.updateUser(indentify.id, params);
    return updateUser;
  }

  async delete(userId: string) {
    const userWithCleaning = await this.databaseCleaning.findCleaning(userId, 1)
    const inProgress = userWithCleaning.cleanings.find(item => item.deletedAt == null)
    if (inProgress) {
      throw new HttpException(
        'Error - User with a schedule in progress',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleteUser = await this.database.deleteUser(userId);

    return deleteUser;
  }

  async getAllUsers(companyId) {
    const allReturn = await this.database.getUsers(companyId);
    return allReturn;
  }

  async recover(userId: string) {
    const recover = await this.database.recover(userId)
    return recover
  }

  async recoverForPdf(companyId: string) {
    const dataReturn: any[] = await this.database.recoverForPdf(companyId)
    const formater = dataReturn.map((item) => {
      const model = {
        user: {
          "name": item.user.name,
          "createdAt": item.user.createdAt,
          "role": item.user.role,
          "email": item.user.email
        },
        cleaning: item.user.cleaning,
        avaliation: item.user.Avaliation

      }

      return model
    })
    return formater
  }
}
