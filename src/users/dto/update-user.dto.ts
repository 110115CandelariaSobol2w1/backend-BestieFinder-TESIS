import { IsString } from "class-validator";

export class UpdateUserDto {
  
  @IsString()
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  telefono: string;

  @IsString()
  photo: string;
}
