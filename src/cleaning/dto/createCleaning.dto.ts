import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  daySelected:string;

  @IsString()
  @IsOptional()
  horsSelected:string

  @IsBoolean()
  automated:Boolean

  @IsBoolean()
  @IsOptional()
  repeat:Boolean
}
