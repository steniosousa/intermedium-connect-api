import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCleaningDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  where: string;
  @IsArray()
  @IsNotEmpty()
  objects: string[];
}
