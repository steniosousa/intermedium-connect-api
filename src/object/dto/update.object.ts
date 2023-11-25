import { IsNotEmpty, IsString } from 'class-validator';

export class updateObjectDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
