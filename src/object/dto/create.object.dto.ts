import { IsNotEmpty, IsString } from 'class-validator';

export class createObjectDto {
    @IsString()
    @IsNotEmpty()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
