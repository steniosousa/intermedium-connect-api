import { IsNotEmpty, IsString } from 'class-validator';

export class updateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    id: string
}
