import { Global, Module } from '@nestjs/common';
import { CleaningDatabase } from './service/cleaning.database';
import { companyDatabase } from './service/company.database';
import { UserDatabase } from './service/user.database';
import { PlaceDatabase } from './service/place.database';
import { PrismaService } from './service/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { ManagerDatabase } from './service/manager.database';
import { objectDatabase } from './service/object.database';
import { EpiDatabase } from './service/epi.database';
import { AvaliationDatabase } from './service/avaliation.database';
import { HistoryDatabase } from './service/history.database';
import { scheduleAppDatabase } from './service/schudeleApp.database';
import { TruckDatabase } from './service/truck.database';
import { FaceRecognitionDatabase } from './service/faceRecognition.database';

@Global()
@Module({
  providers: [
    companyDatabase,
    UserDatabase,
    PrismaService,
    CleaningDatabase,
    PlaceDatabase,
    PrismaUsersRepository,
    ManagerDatabase,
    objectDatabase,
    EpiDatabase,
    AvaliationDatabase,
    HistoryDatabase,
    TruckDatabase,
    scheduleAppDatabase,
    FaceRecognitionDatabase,
  ],
  exports: [
    UserDatabase,
    companyDatabase,
    CleaningDatabase,
    PlaceDatabase,
    PrismaService,
    PrismaUsersRepository,
    ManagerDatabase,
    objectDatabase,
    EpiDatabase,
    AvaliationDatabase,
    HistoryDatabase,
    TruckDatabase,
    scheduleAppDatabase,
    FaceRecognitionDatabase,
  ],
})
export class DatabaseModule {}
