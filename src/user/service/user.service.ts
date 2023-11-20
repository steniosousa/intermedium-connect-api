import { Injectable } from '@nestjs/common';
import { UserDatabase } from 'database/service/user.database';

@Injectable()
export class userService {
  constructor(private readonly database: UserDatabase) {}

  async findUserWithNameAndPass(params) {
    const { userId, password } = params;
    const findUser = await this.database.findUserWithNameAndPassword(
      userId,
      password,
    );
    return findUser;
  }

  async findUser(params) {
    const { key } = params;
    const findUser = await this.database.authenticateUser(key);
    return findUser;
  }

  async updateUser(params) {
    const updateUser = await this.database.updateUser(params);
    return updateUser;
  }

  async delete(params) {
    const deleteUser = await this.database.deleteUser(params);
    return deleteUser;
  }

  async getAllUsers() {
    const allReturn = await this.database.getUsers();
    return allReturn;
  }
}
