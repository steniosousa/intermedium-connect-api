import { IsNotEmpty, IsString } from 'class-validator';

export class recoverHistory {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
