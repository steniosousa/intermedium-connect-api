import { IsNotEmpty, IsString } from 'class-validator';

export class createCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
