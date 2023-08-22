import { IsNotEmpty, IsString } from "class-validator"

export class createPlaceDto{
    @IsString()
    @IsNotEmpty()
    companyId:string
    
    @IsString()
    @IsNotEmpty()
    name:string
}