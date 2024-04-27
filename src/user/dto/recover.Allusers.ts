import { IsNotEmpty, IsString } from 'class-validator';

export class recoverAllUsersDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
