import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateScheduleDto{
    @IsNotEmpty()
    @IsString()
    placeId:  String

    @IsNotEmpty()
    @IsString()
    responsibleId: String

    @IsDate()
    eventDate: Date

    @IsBoolean()
    repeatable:Boolean

    @IsArray()
    @IsNotEmpty()
    objects: string[];
}