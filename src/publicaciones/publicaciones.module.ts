import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacione.entity';
import { publicacionRepository } from './publicacion.repository';
import { Animal } from 'src/animales/entities/animal.entity';
import { animalRepository } from 'src/animales/animal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Animal])],
  controllers: [PublicacionesController],
  providers: [PublicacionesService, publicacionRepository, animalRepository],
})
export class PublicacionesModule {}
