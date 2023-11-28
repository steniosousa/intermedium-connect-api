import { IsNotEmpty, IsString } from 'class-validator';

export class recoverObjectDto {
    @IsString()
    @IsNotEmpty()
    companyId: string;

}
