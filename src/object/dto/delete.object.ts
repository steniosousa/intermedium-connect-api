import { IsNotEmpty, IsString } from 'class-validator';

export class deleteObjectDto {
    @IsString()
    @IsNotEmpty()
    objectsId: string
}
