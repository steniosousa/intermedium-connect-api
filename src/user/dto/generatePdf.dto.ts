import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class generatePdfDto {
    @IsNotEmpty()
    @IsString()
    companyId: string;

}
