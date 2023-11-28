import { IsNotEmpty, IsString } from 'class-validator';

export class createEpiDto {
    @IsString()
    @IsNotEmpty()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
