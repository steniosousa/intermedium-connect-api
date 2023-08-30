import { Injectable } from '@nestjs/common';
import { CronService } from 'cron/cron.service';
import { UserDatabase } from 'database/service/user.database';

@Injectable()
export class userService {
  constructor(private readonly dabatase: UserDatabase,
    private readonly CronService:CronService) {}
  async createUser(params) {
    const { name, password, manager } = params;
    this.CronService.onModuleInit()
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
