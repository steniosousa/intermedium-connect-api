import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditManagerDto {
  @IsNotEmpty()
  @IsString()
  id: string = '';

  @IsString()
  @IsOptional()
  name: string = '';

  @IsString()
  @IsOptional()
  password: string = '';

  @IsEmail()
  @IsOptional()
  email: string = '';
}
