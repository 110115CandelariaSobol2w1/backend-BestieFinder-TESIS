import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';

@Injectable()
export class animalRepository {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async createAnimal(createAnimalDto: CreateAnimaleDto, req){
    const {userId} = req.user;

    const newAnimal = this.animalRepository.create(createAnimalDto);
    newAnimal.user_id = userId;
    return this.animalRepository
      .save(newAnimal)
      .then(() => {
        return {
          message: 'Animal creado satisfactoriamente',
          statusCode: HttpStatus.CREATED,
        };
      })
      .catch((error) => {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          error: 'Error Interno del Servidor',
        });
      });
  }

  async findAll() {
    try {
      const animales = await this.animalRepository.find();
      return {
        message: 'Animales',
        statusCode: HttpStatus.OK,
        data: animales,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.code} ${error.detail}`,
        error: 'Error Interno del Servidor',
      });
    }
  }
  
  async findById(id: number): Promise<any> {
    try {
      const animales = await this.animalRepository.findOne({
        where: {
          animal_id: id,
        },
      });
      return {
        message: 'Animales',
        statusCode: HttpStatus.OK,
        data: animales,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async updateAnimal(id:number,updateAnimalDto: UpdateAnimaleDto, req) {
    try {
      const { userId } = req.user;
  
      const animal = await this.animalRepository.findOne({
        where: {
          animal_id: id,
        },
      });
  
      if (animal.user_id !== userId) {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'No puede modificar mascotas que no le pertenecen',
        });
      }
  
      const animalActualizado = Object.assign(animal, updateAnimalDto)
      await this.animalRepository.save(animalActualizado);
  
      return {
        message: 'Usuario actualizado exitosamente',
        statusCode: HttpStatus.OK,
        data: animalActualizado,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async deleteAnimal(id:number, req){
    try {
      const { userId } = req.user;

      const animal = await this.animalRepository.findOne({
        where: {
          animal_id: id,
        },
      });

      if(!animal){
        return('Animal no encontrado')
      }

      if(animal.user_id !== userId){
        return('No puede eliminar una mascota que no le pertenece')
      }

      await this.animalRepository.remove(animal);

      return {
        message: 'Mascota eliminada con exito',
        statusCode: HttpStatus.OK,
        data: animal,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async cambiarAnimalAdoptado(id:number, req){
    try {
      const { userId } = req.user;
  
      const animal = await this.animalRepository.findOne({
        where: {
          animal_id: id,
        },
        relations: {
          estado: true
        }
      });
  
      if (animal.user_id !== userId) {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'No puede modificar mascotas que no le pertenecen',
        });
      }

      if(animal.estado.estado_id === 4){
        animal.estado.estado_id = 5;
        await this.animalRepository.save(animal);
      }

  
      return {
        message: 'Animal actualizado exitosamente',
        statusCode: HttpStatus.OK,
        data: animal,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async cambiarAnimalPerdidoEncontrado(id:number, req){
    try {
      const { userId } = req.user;
  
      const animal = await this.animalRepository.findOne({
        where: {
          animal_id: id,
        },
        relations: {
          estado: true
        }
      });
  
      if (animal.user_id !== userId) {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'No puede modificar mascotas que no le pertenecen',
        });
      }

      if(animal.estado.estado_id === 1 || animal.estado.estado_id === 2){
        animal.estado.estado_id = 6;
        await this.animalRepository.save(animal);
      }
  
      return {
        message: 'Animal actualizado exitosamente',
        statusCode: HttpStatus.OK,
        data: animal,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }
  
}
