import { IsBoolean, IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    placeId: String

    @IsNotEmpty()
    @IsString()
    userId: String

    @IsNotEmpty()
    @IsArray()
    eventDate: String[];

    @IsBoolean()
    repeatable: Boolean

}