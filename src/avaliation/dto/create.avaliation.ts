import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createAvaliationDto {
    @IsNotEmpty()
    @IsString()
    scheduleId: String

    @IsNotEmpty()
    @IsString()
    managerId: string;

    @IsNotEmpty()
    @IsString()
    status: string

    @IsString()
    @IsOptional()
    observation: string

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    episId: string[];

}
