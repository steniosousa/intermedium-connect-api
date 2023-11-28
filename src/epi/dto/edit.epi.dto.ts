import { IsNotEmpty, IsString } from 'class-validator';

export class editEpiDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    epiId: string
}
