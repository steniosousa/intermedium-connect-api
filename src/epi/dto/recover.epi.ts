import { IsNotEmpty, IsString } from 'class-validator';

export class recoverEpiDto {
    @IsString()
    @IsNotEmpty()
    companyId: string;
}
