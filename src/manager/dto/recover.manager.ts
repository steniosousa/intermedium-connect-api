import { IsNotEmpty,  IsString } from "class-validator"

export class recoverManagerDto {
    @IsNotEmpty()
    @IsString()
    userId: string

}