import { Injectable } from '@nestjs/common';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';
import { animalRepository } from './animal.repository';

@Injectable()
export class AnimalesService {
  constructor(private readonly animalesRepository: animalRepository) {}

  async create(createAnimaleDto: CreateAnimaleDto, req) {
    return await this.animalesRepository.createAnimal(createAnimaleDto, req);
  }

  async findAll() {
    return await this.animalesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.animalesRepository.findById(id);
  }

  async updateAnimal(id: number, updateAnimalDto: UpdateAnimaleDto, req) {
    return await this.animalesRepository.updateAnimal(id, updateAnimalDto, req);
  }

  async deleteAnimal(id: number, req) {
    return await this.animalesRepository.deleteAnimal(id, req);
  }

  async updateAnimalAdoptado(id:number, req){
    return await this.animalesRepository.cambiarAnimalAdoptado(id, req);
  }

  async updateAnimalPerdidoEncontrado(id:number, req){
    return await this.animalesRepository.cambiarAnimalPerdidoEncontrado(id,req);
  }
}
