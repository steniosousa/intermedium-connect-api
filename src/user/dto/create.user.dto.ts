import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}
