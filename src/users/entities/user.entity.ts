import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Animal } from "src/animales/entities/animal.entity";
import { Turno } from "src/turnos/entities/turno.entity";
import { UsuariosRefugio } from "src/usuarios_refugios/entities/usuarios_refugio.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @IsNumber()
  id: number;

  @Column({name: 'user_name'})
  @IsNotEmpty()
  @IsString()
  nombre:string

  @Column({name: 'user_apellido'})
  @IsNotEmpty()
  @IsString()
  apellido:string

  @Column({name: 'user_email', unique:true})
  @IsNotEmpty()
  @IsEmail()
  email:string

  @Column({name: 'user_pass'})
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password:string

  @Column({name: 'user_photo'})
  @IsString()
  @IsOptional()
  photo:string

  @OneToMany(() => Animal, (animal) => animal.user)
  animal: Animal[];

  @OneToMany(() => UsuariosRefugio, (ur) => ur.usuario)
  @JoinColumn({ name: 'id' })
  refugios: UsuariosRefugio[];

  @OneToMany(() => Turno, (turno) => turno.usuario)
  turnos: Turno[];


}

