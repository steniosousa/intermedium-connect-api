import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCleaningDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsArray()
  @IsNotEmpty()
  objects: string[];
  @IsString()
  @IsNotEmpty()
  placeId: string
}
