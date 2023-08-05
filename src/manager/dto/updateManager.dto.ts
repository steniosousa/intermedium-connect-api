import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateManagerDto {
  @IsNotEmpty()
  @IsString()
  managerId: string;

  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  empresaId: string;
}
