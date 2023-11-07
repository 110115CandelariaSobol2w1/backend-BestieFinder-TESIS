import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimaleDto } from './create-animale.dto';
import { IsOptional } from 'class-validator';

export class UpdateAnimaleDto extends PartialType(CreateAnimaleDto) {
    @IsOptional()
    animal_name:string
    @IsOptional()
    animal_raza:string
    @IsOptional()
    animal_edad:number
    @IsOptional()
    animal_color:string
    @IsOptional()
    animal_sexo: string
    @IsOptional()
    animal_descripcion:string
    @IsOptional()
    animal_photo: string
    @IsOptional()
    animal_patio:Boolean
    @IsOptional()
    animal_estado:number
    @IsOptional()
    animal_tipo: number
}
