import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class generatePdfDto {
  @IsNotEmpty()
  @IsString()
  companyId: string = '';

  @IsNotEmpty()
  @IsDateString()
  startDate: Date  = new Date();

  @IsNotEmpty()
  @IsDateString()
  endDate: Date = new Date();
}
