import { IsNumber, IsString } from 'class-validator';
import { Animal } from 'src/animales/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_animales')
export class AnimalTipo {
  @PrimaryGeneratedColumn()
  @IsNumber()
  tipo_id: number;

  @Column()
  @IsString()
  tipo_nombre: string;

  @OneToMany(() => Animal, (animal) => animal.tipo)
  animales: Animal[];
}
