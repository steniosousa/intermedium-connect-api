import { IsNotEmpty, IsString } from 'class-validator';

export class getObect {
  @IsNotEmpty()
  @IsString()
  companyId: string;
}
