import { IsNotEmpty, IsString } from 'class-validator';

export class findCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
