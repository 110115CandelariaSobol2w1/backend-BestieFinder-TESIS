import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { eventoRepository } from './evento.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { userRefugiosRepository } from 'src/usuarios_refugios/usuarios_refugio.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Evento, UsuariosRefugio])],
  controllers: [EventosController],
  providers: [EventosService, eventoRepository, userRefugiosRepository],
})
export class EventosModule {}
