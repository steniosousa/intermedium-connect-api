import { IsNotEmpty, IsString } from 'class-validator';

export class recoverUserDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
