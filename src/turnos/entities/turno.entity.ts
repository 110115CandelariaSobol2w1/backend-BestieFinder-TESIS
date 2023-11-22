import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { EstadoTurno } from 'src/estado_turnos/entities/estado_turno.entity';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  @IsNumber()
  turno_id: number;

  @Column()
  @IsDateString()
  turno_fecha: Date;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  turno_estado: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  refugio_id: number

  @Column()
  @IsDateString()
  turno_fecha_fin: Date;

  @ManyToOne(() => EstadoTurno, (estadoTurno) => estadoTurno.animales)
  @JoinColumn({ name: 'turno_estado' })
  estado: EstadoTurno;

  @ManyToOne(() => User, (usuario) => usuario.turnos)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @ManyToOne(() => Refugio, (refugio) => refugio.turnos)
  @JoinColumn({ name: 'refugio_id' })
  refugio: Refugio;


}
