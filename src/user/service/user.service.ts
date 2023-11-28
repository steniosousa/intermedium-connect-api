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
    const { userId } = params;

    const indentify = await this.database.findUser(userId)
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
    const userWithCleaning = await this.databaseCleaning.findCleaning(userId)
    const inProgress = userWithCleaning.find(item => item.deletedAt == null)
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
}
