import { CleaningDatabase } from '@/database/service/cleaning.database';
import { UserDatabase } from '@/database/service/user.database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class userService {
  constructor(
    private readonly database: UserDatabase,
    readonly databaseCleaning: CleaningDatabase,
  ) {}

  async findUserWithNameAndPass(params:any) {
    const { name, password } = params

    const findUser = await this.database.findUserWithNameAndPassword(
      name,
      password
    );
    return findUser;
  }

  async findUser(key: string) {
    const findUser = await this.database.authenticateUser(key);
    return findUser;
  }

  async updateUser(params:{id:string}) {
    const { id } = params;

    const indentify = await this.database.findUser(id);
    if (!indentify) {
      throw new HttpException('Error - User not found', HttpStatus.BAD_REQUEST);
    }
    const updateUser = await this.database.updateUser(indentify.id, params);
    return updateUser;
  }

  async delete(userId: string) {
    const userWithCleaning = await this.databaseCleaning.findCleaning(
      userId,
      1,
    );
    const inProgress = userWithCleaning.cleanings.find(
      (item:any) => item.deletedAt == null,
    );
    if (inProgress) {
      throw new HttpException(
        'Error - User with a schedule in progress',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleteUser = await this.database.deleteUser(userId);

    return deleteUser;
  }

  async getAllUsers(companyId:string) {
    
    const allReturn = await this.database.getUsers(companyId);
    return allReturn;
  }

  async recover(userId: string) {
    const recover = await this.database.recover(userId);
    return recover;
  }

  async recoverForPdf(companyId: string, startDate: Date, endDate: Date) {
    const dataReturn: any[] = await this.database.recoverForPdf(
      companyId,
      startDate,
      endDate,
    );

    const formater = dataReturn.map((item) => {
      if (
        item.user.cleaning.length === 0 &&
        item.user.Avaliation.length === 0
      ) {
        return;
      }
      const model = {
        user: {
          name: item.user.name,
          createdAt: item.user.createdAt,
          role: item.user.role,
          email: item.user.email,
        },
        cleaning: item.user.cleaning,
        avaliation: item.user.Avaliation,
      };
      return model;
    });
    const filterFormater = formater.filter((item) => item !== undefined);
    if (filterFormater.length === 0) {
      throw new HttpException(
        'Sem cadastros para essa data',
        HttpStatus.FORBIDDEN,
      );
    }

    return filterFormater;
  }
}
