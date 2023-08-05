import { IsNotEmpty, IsString } from 'class-validator';

export class deleteManagerDto {
  @IsNotEmpty()
  @IsString()
  managerId: string;
}
