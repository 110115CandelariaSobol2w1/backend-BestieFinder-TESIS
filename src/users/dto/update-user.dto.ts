import { IsString } from "class-validator";

export class UpdateUserDto {
    
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  photo: string;
}
