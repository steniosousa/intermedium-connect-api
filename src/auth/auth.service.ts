import { PrismaService } from '@/database/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user:any = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      const confirmPass = await compare(password, user.password);
      if (confirmPass) {
        return user;
      } else {
        return null;
      }
    } catch {
      throw new Error('User undefined');
    }
  }
}
