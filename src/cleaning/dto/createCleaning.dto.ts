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
  @IsString()
  @IsNotEmpty()
  where: string;
  @IsArray()
  @IsNotEmpty()
  objects: string[];

  @IsString()
  @IsOptional()
  daySelected: string;

  @IsString()
  @IsOptional()
  horsSelected: string;

  @IsBoolean()
  @IsOptional()
  repeat: boolean;
}
