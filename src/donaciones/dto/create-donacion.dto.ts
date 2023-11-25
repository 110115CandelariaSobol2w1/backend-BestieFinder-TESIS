import { IsDate, IsDecimal, IsNotEmpty, IsNumber } from "class-validator";
import { Column, Decimal128 } from "typeorm";

export class CreateDonacionDto {
  @Column('decimal', { precision: 10, scale: 2 }) // Ejemplo de tipo decimal con precisión y escala
  @IsNotEmpty()
  donacion_monto: number;

  @Column()
  @IsNotEmpty()
  @IsDate()
  donacion_fecha: Date;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  refugio_id: number;
}
