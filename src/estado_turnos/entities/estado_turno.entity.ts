import { IsNumber, IsString } from "class-validator";
import { Turno } from "src/turnos/entities/turno.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('estado_turnos')
export class EstadoTurno {
    @PrimaryGeneratedColumn()
  @IsNumber()
  estado_id: number;

  @Column()
  @IsString()
  estado_nombre: string;

  @OneToMany(() => Turno, (turno) => turno.estado)
  animales: Turno[];
}
