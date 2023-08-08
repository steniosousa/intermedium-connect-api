import { Injectable } from '@nestjs/common';
import { UserDatabase } from 'src/database/service/user.database';

@Injectable()
export class userService {
  constructor(private readonly dabatase: UserDatabase) {}
  async createUser(params) {
    const { name, password, manager } = params;
    const createUser = await this.dabatase.createNewUser(
      name,
      password,
      manager,
    );
    return createUser;
  }

  async findUserWithNameAndPass(params) {
    const { userId, password } = params;
    const findUser = await this.dabatase.findUserWithNameAndPassword(
      userId,
      password,
    );
    return findUser;
  }

  async findUser(params) {
    const { key } = params;
    const findUser = await this.dabatase.authenticateUser(key);
    return findUser;
  }

  async updateUser(params) {
    const updateUser = await this.dabatase.updateUser(params);
    return updateUser;
  }

  async delete(params) {
    const deleteUser = await this.dabatase.deleteUser(params);
    return deleteUser;
  }
}
