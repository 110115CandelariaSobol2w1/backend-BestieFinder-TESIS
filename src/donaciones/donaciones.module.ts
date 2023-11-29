import { Module } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donacion } from './entities/donacion.entity';
import { DonacionesController } from './donaciones.controller';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { RefugiosService } from 'src/refugios/refugios.service';
import { refugioRepository } from 'src/refugios/refugio.repository';
import { User } from 'src/users/entities/user.entity';
import { userRepository } from 'src/users/user.repository';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { userRefugiosRepository } from 'src/usuarios_refugios/usuarios_refugio.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Donacion, Refugio, UsuariosRefugio])],
  controllers:[DonacionesController],
  providers: [DonacionesService, refugioRepository, userRefugiosRepository],
})
export class DonacionesModule {}
