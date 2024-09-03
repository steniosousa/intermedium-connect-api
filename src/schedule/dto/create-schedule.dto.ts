import { IsBoolean, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  placeId: string = '';

  @IsNotEmpty()
  @IsString()
  userId: string = '';

  @IsNotEmpty()
  @IsArray()
  eventDate: string[] = [''];

  @IsBoolean()
  repeatable: boolean = false;
}
