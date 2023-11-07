import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Animal } from 'src/animales/entities/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('publicaciones')
export class Publicacion {
  @PrimaryGeneratedColumn()
  @IsNumber()
  publicacion_id: number;

  @Column()
  @IsString()
  publicacion_descripcion: string;

  @Column()
  @IsString()
  publicacion_ubicacion: string;

  @Column()
  @IsDateString()
  publicacion_fecha: Date;

  @Column()
  @IsString()
  publicacion_photo: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  animal_id: number;

  @ManyToOne(() => Animal, (animal) => animal.publicacion)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;
}
