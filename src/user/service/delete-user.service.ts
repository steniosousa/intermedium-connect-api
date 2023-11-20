import { PrismaUsersRepository } from 'database/prisma/repositories/prisma-users.repository';

export class DeleteUserService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
