import { IsDate, IsDecimal, IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Decimal128, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('donaciones')
export class Donacion {
  @PrimaryGeneratedColumn()
  @IsNumber()
  donacion_id :number

  @Column('decimal', { precision: 10, scale: 2 }) // Ejemplo de tipo decimal con precisión y escala
  @IsNotEmpty()
  donacion_monto: number;

  @Column()
  @IsNotEmpty()
  @IsDate()
  donacion_fecha :Date

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id :number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  refugio_id :number

  @ManyToOne(() => User, user => user.donaciones)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

}
