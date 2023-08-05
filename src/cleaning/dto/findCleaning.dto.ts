import { IsNotEmpty, IsString } from 'class-validator';

export class findCleaningDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
