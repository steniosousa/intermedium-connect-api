import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class recoverAvaliationDto {
    @IsNotEmpty()
    @IsString()
    userId: String

}
