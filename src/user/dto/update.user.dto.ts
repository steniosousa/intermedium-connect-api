import {  IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsOptional()
  deletedAt: Date;
  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  companyId: string;
  @IsString()
  @IsOptional()
  managerId: string;
}
