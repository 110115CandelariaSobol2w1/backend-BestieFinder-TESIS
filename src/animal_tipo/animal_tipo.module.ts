import { Module } from '@nestjs/common';
import { AnimalTipoService } from './animal_tipo.service';
import { AnimalTipoController } from './animal_tipo.controller';

@Module({
  controllers: [AnimalTipoController],
  providers: [AnimalTipoService],
})
export class AnimalTipoModule {}
