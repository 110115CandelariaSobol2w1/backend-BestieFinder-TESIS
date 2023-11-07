import { Injectable } from '@nestjs/common';
import { CreateAnimalTipoDto } from './dto/create-animal_tipo.dto';
import { UpdateAnimalTipoDto } from './dto/update-animal_tipo.dto';

@Injectable()
export class AnimalTipoService {
  create(createAnimalTipoDto: CreateAnimalTipoDto) {
    return 'This action adds a new animalTipo';
  }

  findAll() {
    return `This action returns all animalTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalTipo`;
  }

  update(id: number, updateAnimalTipoDto: UpdateAnimalTipoDto) {
    return `This action updates a #${id} animalTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalTipo`;
  }
}
