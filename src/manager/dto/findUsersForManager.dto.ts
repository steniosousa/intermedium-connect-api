import { IsNotEmpty, IsString } from 'class-validator';

export class findUsersForManager {
  @IsString()
  @IsNotEmpty()
  id: string;
}
