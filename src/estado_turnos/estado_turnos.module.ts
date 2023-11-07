import { Module } from '@nestjs/common';
import { EstadoTurnosService } from './estado_turnos.service';
import { EstadoTurnosController } from './estado_turnos.controller';

@Module({
  controllers: [EstadoTurnosController],
  providers: [EstadoTurnosService],
})
export class EstadoTurnosModule {}
