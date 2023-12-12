import { IsBase64, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Donacion } from 'src/donaciones/entities/donacion.entity';
import { Evento } from 'src/eventos/entities/evento.entity';
import { RedSocial } from 'src/redes_sociales/entities/redes_sociale.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refugios')
export class Refugio {
  @PrimaryGeneratedColumn()
  @IsNumber()
  refugio_id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_nombre: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_pais: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_provincia: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_ciudad: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_telefono: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  refugio_descripcion: string;
  
  @Column()
  @IsNotEmpty()
  @IsBoolean()
  refugio_castraciones: Boolean;

  @Column({name: 'refugio_photo'})
  @IsString()
  @IsBase64()
  @IsOptional()
  refugio_photo:string

  @OneToMany(() => RedSocial, (redSocial) => redSocial.refugio)
  redesSociales: RedSocial[];

  @OneToMany(() => Evento, (evento) => evento.refugio)
  evento: Evento[];

  @OneToMany(() => UsuariosRefugio, (ur) => ur.refugio)
  @JoinColumn({ name: 'refugio_id' }) // Define la columna de clave externa
  usuarios: UsuariosRefugio[];

  @OneToMany(() => Turno, (turno) => turno.refugio)
  turnos: Turno[];

  @OneToMany(() => Donacion, donacion => donacion.refugio)
  donaciones: Donacion[];
}
