import { IsNotEmpty, IsString } from 'class-validator';

export class CreateObjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
