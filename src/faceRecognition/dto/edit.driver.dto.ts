import { IsNotEmpty, IsString } from 'class-validator';

export class editUserFaceRecognitiontDto {
  @IsString()
  @IsNotEmpty()
  driverId: string = '';

}
