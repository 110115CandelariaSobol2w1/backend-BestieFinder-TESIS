import { Module } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { AnimalesController } from './animales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { animalRepository } from './animal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalesController],
  providers: [AnimalesService,animalRepository],
})
export class AnimalesModule {}
