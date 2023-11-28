import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateManagerDto{
    @IsNotEmpty()
    @IsString()
    companyId:  String

    @IsNotEmpty()
    @IsString()
    name: String

    @IsString()
    @IsOptional()
    password: String

    @IsNotEmpty()
    @IsEmail()
    email:String

}