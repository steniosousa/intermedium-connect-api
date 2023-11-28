import { IsNotEmpty, IsString } from 'class-validator';

export class deleteCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
