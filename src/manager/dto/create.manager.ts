import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateManagerDto {
  @IsNotEmpty()
  @IsArray()
  companyId: string[] = [''];

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsEmail()
  email: string = '';

  @IsNotEmpty()
  @IsString()
  role: string = '';

  @IsArray()
  @IsNotEmpty()
  permissions: string[] = [''];
}
