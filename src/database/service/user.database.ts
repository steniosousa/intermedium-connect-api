import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async authenticateUser(key: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          loginHash: key,
        },
      });
      return user;
    } catch {
      throw new HttpException('Error - User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async findUserWithNameAndPassword(name: string, password: string) {

    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name,
        },
      });
  
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
  
      return user;
  
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
  
      throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserWithEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          password: true,
        },
      });
      return user;
    } catch {
      throw new HttpException('Error - User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(userId:string, datas:any) {
    const novaData = new Date();

if(datas.deletedAt){
  const updateUser = await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: datas.deletedAt ? novaData : null,
    },
  });
  return updateUser;
}


    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...datas      },
    });
    return updateUser;
  }

  async findUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('Error - User not found', HttpStatus.BAD_REQUEST);
    }
  }
  async deleteUser(userId: string) {
    try {
      const deleteUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return deleteUser;
    } catch {
      throw new HttpException(
        'Error - Error when deleting user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsers(companyId: string) {
    try {
      const allUsers = await this.prisma.user.findMany({
        where: {
          userForCompany: {
            every: {
              companyId: companyId,
            },
          },
          AND: {
            role: {
              equals: 'EMPLOYEE',
            },
            deletedAt: {
              equals: null,
            },
            deactivatedAt: {
              equals: null,
            },
          },
        },
        select: {
          id: true,
          loginHash: true,
          name: true,
          deletedAt: true,
          userForCompany: true,
          role: true,
          deactivatedAt: true,
        },
      });
      return allUsers;
    } catch (error) {
      let message = 'Error to recover users';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async recover(userId: string) {
    try {
      const allUsers = await this.prisma.userForCompany.findMany({
        where: {
          userId,
        },
        select: {
          user: {
            select: {
              deactivatedAt: true,
            },
          },
        },
      });
      return allUsers;
    } catch (error) {
      let message = 'Error to recover users';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async recoverForPdf(companyId: string, startDate: Date, endDate: Date) {
    try {
      const allUsers = await this.prisma.userForCompany.findMany({
        where: {
          companyId,
          company: {
            desactiveAt: {
              equals: null,
            },
          },
          user: {
            cleaning: {
              every: {
                AND: [
                  { createdAt: { gte: new Date(startDate) } },
                  { createdAt: { lte: new Date(endDate) } },
                ],
              },
            },
          },
        },
        select: {
          user: {
            select: {
              cleaning: {
                select: {
                  Place: {
                    select: {
                      name: true,
                    },
                  },
                  status: true,
                  createdAt: true,
                },
              },
              name: true,
              createdAt: true,
              role: true,
              email: true,
              Avaliation: {
                select: {
                  status: true,
                  observation: true,
                  Cleaning: {
                    select: {
                      Place: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                  EquipmentsOfAvaliation: {
                    select: {
                      equipament: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return allUsers;
    } catch (error) {
      let message = 'Error to recover users';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async recoverAvaliation(companyId: string) {
    try {
      const allUsers = await this.prisma.userForCompany.findMany({
        where: {
          companyId,
          company: {
            desactiveAt: {
              equals: null,
            },
          },
        },
        select: {
          user: {
            select: {
              cleaning: true,
              name: true,
              createdAt: true,
              role: true,
              email: true,
            },
          },
        },
      });
      return allUsers;
    } catch (error) {
      let message = 'Error to recover users';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }
}
