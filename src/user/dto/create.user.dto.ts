import { IsNotEmpty, IsString } from 'class-validator';

export class createServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  manager: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
