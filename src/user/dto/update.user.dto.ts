import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string = '';
  @IsOptional()
  deletedAt: Date = new Date();
  @IsString()
  @IsOptional()
  password: string = '';
  @IsString()
  @IsOptional()
  name: string = '';
  @IsString()
  @IsOptional()
  companyId: string = '';
  @IsString()
  @IsOptional()
  managerId: string = '';
}
