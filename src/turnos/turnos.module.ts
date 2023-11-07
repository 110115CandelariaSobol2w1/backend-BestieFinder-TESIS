import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { turnosRepository } from './turnos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [TurnosController],
  providers: [TurnosService, turnosRepository],
})
export class TurnosModule {}
