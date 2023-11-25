import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCleaningDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  placeId: string

  @IsArray()
  @IsNotEmpty()
  objectsId: string[];
}
