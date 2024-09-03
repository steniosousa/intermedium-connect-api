import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindCleaningDto {
  @IsString()
  @IsNotEmpty()
  userId: string = '';

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number = 0;
}
