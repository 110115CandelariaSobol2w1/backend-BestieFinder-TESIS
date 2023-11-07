import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Refugio } from "src/refugios/entities/refugio.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('redes_sociales')
export class RedSocial {
@PrimaryGeneratedColumn()
@IsNumber()
redes_id: number

@Column()
@IsNotEmpty()
@IsString()
redes_nombre: string

@Column()
@IsNotEmpty()
@IsString()
redes_url: string

@Column()
@IsNotEmpty()
@IsNumber()
refugio_id: number

@ManyToOne(() => Refugio, (refugio) => refugio.redesSociales)
@JoinColumn({ name: "refugio_id" })
  refugio: Refugio;
}
