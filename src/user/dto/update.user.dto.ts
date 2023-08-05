import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsBoolean()
  @IsOptional()
  active: boolean;
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
