import { Module } from '@nestjs/common';
import { faceRecognitiontService } from './service/faceRecognition.service';
import { faceRecognitionController } from './controller/faceRecognition.controller';

@Module({
  providers: [faceRecognitiontService],
  controllers: [faceRecognitionController],
})
export class faceRecognitionModule {}
