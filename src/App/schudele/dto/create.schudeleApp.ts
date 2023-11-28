import {
    IsArray,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class CreateSchudeleDto {

    @IsArray()
    @IsNotEmpty()
    Evidences: object[];
  }
  