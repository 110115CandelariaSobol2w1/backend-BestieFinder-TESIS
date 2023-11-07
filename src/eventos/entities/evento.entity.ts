import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Refugio } from "src/refugios/entities/refugio.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('eventos')
export class Evento {
    @PrimaryGeneratedColumn()
    @IsNumber()
    evento_id:number;

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

    @ManyToOne(() => Refugio, (refugio) => refugio.evento)
    @JoinColumn({name: "refugio_id"})
    refugio: Refugio;

}
