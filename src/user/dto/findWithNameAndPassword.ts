import { IsNotEmpty, IsString } from 'class-validator';

export class findUserWithNameAndPasswordDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
