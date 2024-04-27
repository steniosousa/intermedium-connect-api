import {
  IsArray,
  IsDate,
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

  @IsNotEmpty()
  @IsArray()
  eventDate: String[];
}
