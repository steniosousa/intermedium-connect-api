import { IsNotEmpty, IsString } from 'class-validator';

export class createManagerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
