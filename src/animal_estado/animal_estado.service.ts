import { Injectable } from '@nestjs/common';
import { CreateAnimalEstadoDto } from './dto/create-animal_estado.dto';
import { UpdateAnimalEstadoDto } from './dto/update-animal_estado.dto';

@Injectable()
export class AnimalEstadoService {
  create(createAnimalEstadoDto: CreateAnimalEstadoDto) {
    return 'This action adds a new animalEstado';
  }

  findAll() {
    return `This action returns all animalEstado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalEstado`;
  }

  update(id: number, updateAnimalEstadoDto: UpdateAnimalEstadoDto) {
    return `This action updates a #${id} animalEstado`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalEstado`;
  }
}
