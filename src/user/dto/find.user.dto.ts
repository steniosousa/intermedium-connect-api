import { IsNotEmpty, IsString } from 'class-validator';

export class findUserDto {
  @IsNotEmpty()
  @IsString()
  key: string;
}
