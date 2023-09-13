import { IsNotEmpty, IsString } from 'class-validator';

export class findPlacesDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
