import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditManagerDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsString()
    @IsOptional()
    name: String

    @IsString()
    @IsOptional()
    password: String

    @IsEmail()
    @IsOptional()
    email: String

    @IsNotEmpty()
    @IsString()
    codigo: String

}