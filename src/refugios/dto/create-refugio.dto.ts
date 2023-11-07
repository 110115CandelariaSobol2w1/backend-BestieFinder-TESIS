import { IsBoolean, IsString } from "class-validator";

export class CreateRefugioDto {
    
  @IsString()
  refugio_nombre: string;
  
  @IsString()
  refugio_pais: string;
  
  @IsString()
  refugio_provincia: string;
  
  @IsString()
  refugio_ciudad: string;
  
  @IsString()
  refugio_telefono: string;

  @IsString()
  refugio_descripcion: string;
  
  @IsBoolean()
  refugio_castraciones: boolean;
}
