import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios_refugios')
export class UsuariosRefugio {
  @PrimaryGeneratedColumn()
  @IsNumber()
  ref_user_id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  ref_user_rol:string

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  ref_user_owner:boolean

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  ref_user_confirmado:boolean

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  refugio_id: number

  @ManyToOne(() => User, (usuario) => usuario.refugios)
  @JoinColumn({ name: 'user_id' }) // Define la columna de clave externa
  usuario: User;

  @ManyToOne(() => Refugio, (refugio) => refugio.usuarios)
  @JoinColumn({ name: 'refugio_id' }) // Define la columna de clave externa
  refugio: Refugio;

}
