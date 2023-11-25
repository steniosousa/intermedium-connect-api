import { IsNotEmpty, IsString } from "class-validator"

export class DeleteScheduleDto {
    @IsNotEmpty()
    @IsString()
    scheduleId: String
}