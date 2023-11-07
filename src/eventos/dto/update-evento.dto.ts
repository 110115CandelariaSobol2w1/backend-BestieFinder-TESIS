import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-evento.dto';
import { Column } from 'typeorm';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventoDto{
    @Column()
    @IsString()
    @IsOptional()
    evento_nombre: string

    @Column()
    @IsString()
    @IsOptional()
    evento_descripcion: string

    @Column()
    @IsDateString()
    @IsOptional()
    evento_inicio: Date

    @Column()
    @IsDateString()
    @IsOptional()
    evento_fin: Date

    @Column()
    @IsString()
    @IsOptional()
    evento_ubicacion: string

    @Column()
    @IsString()
    @IsOptional()
    evento_ciudad: string

    @Column()
    @IsString()
    @IsOptional()
    evento_photo: string
}
