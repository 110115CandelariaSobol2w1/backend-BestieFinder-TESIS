import { Module } from '@nestjs/common';
import { RefugiosService } from './refugios.service';
import { RefugiosController } from './refugios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refugio } from './entities/refugio.entity';
import { refugioRepository } from './refugio.repository';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { userRefugiosRepository } from 'src/usuarios_refugios/usuarios_refugio.repository';
import { RedSocial } from 'src/redes_sociales/entities/redes_sociale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refugio, UsuariosRefugio])],
  controllers: [RefugiosController],
  providers: [RefugiosService,refugioRepository, userRefugiosRepository],
})
export class RefugiosModule {}
