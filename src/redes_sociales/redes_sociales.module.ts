import { Module } from '@nestjs/common';
import { RedesSocialesService } from './redes_sociales.service';
import { RedesSocialesController } from './redes_sociales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocial } from './entities/redes_sociale.entity';
import { redesRepository } from './redes_sociales.repository';
import { refugioRepository } from 'src/refugios/refugio.repository';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { userRefugiosRepository } from 'src/usuarios_refugios/usuarios_refugio.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RedSocial, Refugio, UsuariosRefugio])],
  controllers: [RedesSocialesController],
  providers: [RedesSocialesService,redesRepository, refugioRepository, userRefugiosRepository],
})
export class RedesSocialesModule {}
