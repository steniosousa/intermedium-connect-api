import { IsNotEmpty, IsString } from 'class-validator';

export class findHistoryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
