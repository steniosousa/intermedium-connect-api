import { IsNotEmpty, IsString } from 'class-validator';

export class deleteEpiDto {
    @IsString()
    @IsNotEmpty()
    episId: string;


}
