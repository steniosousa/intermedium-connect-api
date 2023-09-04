import { IsNotEmpty, IsString } from "class-validator";

export class GetAllCrons{
    @IsNotEmpty()
    @IsString()
    userId:string

}