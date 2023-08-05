import { IsNotEmpty, IsString } from 'class-validator';

export class findManagerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
