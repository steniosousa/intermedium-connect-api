import { IsNotEmpty, IsString } from 'class-validator';

export class createUserFaceRecognitiontDto {
  @IsString()
  @IsNotEmpty()
  name: string = '';

  @IsString()
  @IsNotEmpty()
  plate: string = '';

  @IsString()
  @IsNotEmpty()
  photo: string = '';

  @IsString()
  @IsNotEmpty()
  descritor: string = '';
}
