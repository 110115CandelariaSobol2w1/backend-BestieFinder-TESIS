import { IsBase64, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AnimalEstado } from 'src/animal_estado/entities/animal_estado.entity';
import { AnimalTipo } from 'src/animal_tipo/entities/animal_tipo.entity';
import { Publicacion } from 'src/publicaciones/entities/publicacione.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animales')
export class Animal {
  @PrimaryGeneratedColumn()
  @IsNumber()
  animal_id: number;

  @Column()
  @IsOptional()
  @IsString()
  animal_name:string

  @Column()
  @IsNotEmpty()
  @IsString()
  animal_raza:string

  @Column()
  @IsNotEmpty()
  @IsNumber()
  animal_edad:number

  @Column()
  @IsNotEmpty()
  @IsString()
  animal_color:string

  @Column()
  @IsNotEmpty()
  @IsString()
  animal_sexo:string

  @Column()
  @IsNotEmpty()
  @IsString()
  animal_descripcion:string

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  animal_photo:string

  @Column()
  @IsOptional()
  @IsString()
  animal_personalidad:string

  @Column()
  @IsOptional()
  @IsBoolean()
  animal_patio:Boolean

  @Column()
  @IsNotEmpty()
  @IsNumber()
  animal_estado: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  animal_tipo: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id: number

  @ManyToOne(() => User, (user) => user.animal)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => AnimalEstado, (animalEstado) => animalEstado.animales)
  @JoinColumn({ name: 'animal_estado' })
  estado: AnimalEstado;

  @ManyToOne(() => AnimalTipo, (animalTipo) => animalTipo.animales)
  @JoinColumn({ name: 'animal_tipo' })
  tipo: AnimalTipo; //

  @OneToMany(() => Publicacion, (publicacion) => publicacion.animal)
  publicacion: Publicacion[];
}
