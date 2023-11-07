import { Module } from '@nestjs/common';
import { UsuariosRefugiosService } from './usuarios_refugios.service';
import { UsuariosRefugiosController } from './usuarios_refugios.controller';
import { UsuariosRefugio } from './entities/usuarios_refugio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userRefugiosRepository } from './usuarios_refugio.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosRefugio])],
  controllers: [UsuariosRefugiosController],
  providers: [UsuariosRefugiosService, userRefugiosRepository],
})
export class UsuariosRefugiosModule {}
