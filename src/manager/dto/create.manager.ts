import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateManagerDto {
    @IsNotEmpty()
    @IsArray()
    companyId: String[]

    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsEmail()
    email: String

    @IsNotEmpty()
    @IsString()
    role: string

    @IsArray()
    @IsNotEmpty()
    permissions: String[]

}