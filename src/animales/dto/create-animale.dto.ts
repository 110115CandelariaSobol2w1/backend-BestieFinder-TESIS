import { IsOptional } from "class-validator"

export class CreateAnimaleDto {

    animal_name:string
    animal_raza:string
    animal_edad:number
    @IsOptional()
    animal_color:string
    @IsOptional()
    animal_sexo: string
    @IsOptional()
    animal_descripcion:string
    @IsOptional()
    animal_photo: string
    animal_patio:Boolean
    animal_estado:number
    animal_tipo: number
    user_id:number
}
