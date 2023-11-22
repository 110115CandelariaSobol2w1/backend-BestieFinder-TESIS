import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { turnosRepository } from './turnos.repository';
import { Animal } from 'src/animales/entities/animal.entity';
import { AnimalesService } from 'src/animales/animales.service';
import { animalRepository } from 'src/animales/animal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Animal])],
  controllers: [TurnosController],
  providers: [TurnosService, turnosRepository, AnimalesService, animalRepository],
})
export class TurnosModule {}
