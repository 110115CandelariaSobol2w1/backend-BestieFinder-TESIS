import { Module } from '@nestjs/common';
import { AnimalEstadoService } from './animal_estado.service';
import { AnimalEstadoController } from './animal_estado.controller';

@Module({
  controllers: [AnimalEstadoController],
  providers: [AnimalEstadoService],
})
export class AnimalEstadoModule {}
