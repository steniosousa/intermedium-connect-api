import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCleaningDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
