import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

}
