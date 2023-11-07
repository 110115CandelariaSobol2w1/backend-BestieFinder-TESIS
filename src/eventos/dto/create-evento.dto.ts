import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Column } from "typeorm"

export class CreateEventoDto {
    
    @Column()
    @IsString()
    evento_nombre: string

    @Column()
    @IsString()
    evento_descripcion: string

    @Column()
    @IsDateString()
    evento_inicio: Date

    @Column()
    @IsDateString()
    evento_fin: Date

    @Column()
    @IsString()
    evento_ubicacion: string

    @Column()
    @IsString()
    evento_ciudad: string

    @Column()
    @IsString()
    evento_photo: string

    @Column()
    @IsNotEmpty()
    @IsNumber()
    refugio_id:number
}
