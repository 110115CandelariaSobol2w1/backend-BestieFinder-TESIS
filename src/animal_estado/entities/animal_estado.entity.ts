import { IsNumber, IsString } from 'class-validator';
import { Animal } from 'src/animales/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estado_animales')
export class AnimalEstado {
  @PrimaryGeneratedColumn()
  @IsNumber()
  estado_id: number;

  @Column()
  @IsString()
  estado_nombre: string;

  @OneToMany(() => Animal, (animal) => animal.estado)
  animales: Animal[];
}
