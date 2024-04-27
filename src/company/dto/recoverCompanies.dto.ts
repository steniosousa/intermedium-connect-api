import { IsNotEmpty, IsString } from 'class-validator';

export class recoverCompaniesDto {
  @IsNotEmpty()
  @IsString()
  managerId: string;
}
