import { IsNotEmpty, IsString } from "class-validator"

export class recoverScheduleDto {
    @IsNotEmpty()
    @IsString()
    userId: String



}