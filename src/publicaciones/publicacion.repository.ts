import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacione.entity';
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnimaleDto } from 'src/animales/dto/create-animale.dto';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { Animal } from 'src/animales/entities/animal.entity';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';

@Injectable()
export class publicacionRepository {
  constructor(
    @InjectRepository(Publicacion)
    private publicacionRepository: Repository<Publicacion>,
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
  ) {}

  async createPublicacionAndAnimal(createData: any,req) {
    const { userId } = req.user;
    try {
      const newAnimal = this.animalRepository.create({
        ...createData,
        user_id: userId,
      });
      const animal = await this.animalRepository.save(newAnimal);

      // Crear la publicación vinculada al animal
      const newPublicacion = this.publicacionRepository.create({
        ...createData,
        animal_id: animal,
      });
      await this.publicacionRepository.save(newPublicacion);

      return {
        message: 'Animal y publicación creados satisfactoriamente',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const publicacion = await this.publicacionRepository.findOne({
        where: {
          publicacion_id: id,
        },
        relations: {
            animal: true
        }
      });
      return {
        message: 'Publicacion',
        statusCode: HttpStatus.OK,
        data: publicacion,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async findByTipoAnimal(id: number): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = :id', { id })
        .getMany();

      return {
        message: 'Publicaciones',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async findByEstadoAnimal(id: number): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_estado = :id', { id })
        .getMany();

      return {
        message: 'Publicaciones',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getPerrosAdopcion(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 1')
        .andWhere('animal.animal_estado = 4')
        .getMany();

      return {
        message: 'Perros en adopcion',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getGatosAdopcion(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 2')
        .andWhere('animal.animal_estado = 4')
        .getMany();

      return {
        message: 'Gatos en adopcion',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getAvesAdopcion(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 3')
        .andWhere('animal.animal_estado = 4')
        .getMany();

      return {
        message: 'Aves en adopcion',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getOtrosAdopcion(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 4')
        .andWhere('animal.animal_estado = 4')
        .getMany();

      return {
        message: 'Otros en adopcion',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getPerrosPerdidos(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 1')
        .andWhere('animal.animal_estado = 1')
        .getMany();

      return {
        message: 'Perros perdidos',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getGatosPerdidos(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 2')
        .andWhere('animal.animal_estado = 1')
        .getMany();

      return {
        message: 'Gatos perdidos',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getAvesPerdidas(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 3')
        .andWhere('animal.animal_estado = 1')
        .getMany();

      return {
        message: 'Aves perdidas',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getOtrosPerdidos(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 4')
        .andWhere('animal.animal_estado = 1')
        .getMany();

      return {
        message: 'Otros perdidos',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getPerrosEncontrados(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 1')
        .andWhere('animal.animal_estado = 2')
        .getMany();

      return {
        message: 'Perros encontrados',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getGatosEncontrados(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 2')
        .andWhere('animal.animal_estado = 2')
        .getMany();

      return {
        message: 'Gatos encontrados',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getAvesEncontradas(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 3')
        .andWhere('animal.animal_estado = 2')
        .getMany();

      return {
        message: 'Aves encontradas',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getOtrosEncontrados(): Promise<any> {
    try {
        const publicaciones = await this.publicacionRepository
        .createQueryBuilder('publicacion')
        .select([
          'publicacion.publicacion_id',
          'publicacion.publicacion_descripcion',
          'publicacion.publicacion_ubicacion',
          'publicacion.publicacion_fecha',
          'publicacion.publicacion_photo',
          'animal.animal_id',
          'animal.animal_name',
          'animal.animal_raza',
          'animal.animal_edad',
          'animal.animal_color',
          'animal.animal_sexo',
          'animal.animal_descripcion',
          'animal.animal_photo',
          'animal.animal_personalidad',
          'animal.animal_patio',
          'animal.animal_estado',
          'animal.animal_tipo',
          'animal.user_id'
        ])
        .innerJoin('publicacion.animal', 'animal')
        .where('animal.animal_tipo = 4')
        .andWhere('animal.animal_estado = 2')
        .getMany();

      return {
        message: 'Otros encontrados',
        statusCode: HttpStatus.OK,
        data: publicaciones,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async deletePublicacionAndAnimal(id:number, req){
    try {
      const { userId } = req.user;

      const publicacion = await this.publicacionRepository.findOne({
        where: {
          publicacion_id: id,
        },
        relations: {
          animal: true
        }
      });

      if(!publicacion){
        return('Publicacion no encontrada')
      }

      console.log(publicacion.animal.user_id)

      if(publicacion.animal.user_id !== userId){
        return('No puede eliminar una publicacion que no le pertenece')
      }

      await this.publicacionRepository.remove(publicacion);

      return {
        message: 'Publicacion eliminada con exito',
        statusCode: HttpStatus.OK,
        data: publicacion,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async updatePublicacion(id:number,updatePublicacion: UpdatePublicacioneDto, req) {
    try {
      const { userId } = req.user;
  
      const publicacion = await this.publicacionRepository.findOne({
        where: {
          publicacion_id: id,
        },
        relations: {
          animal: true
        }
      });
  
      if (publicacion.animal.user_id !== userId) {
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'No puede modificar publicaciones que no le pertenecen',
        });
      }
  
      const publicacionActualizada = Object.assign(publicacion, updatePublicacion)
      await this.publicacionRepository.save(publicacionActualizada);
  
      return {
        message: 'Publicacion actualizada exitosamente',
        statusCode: HttpStatus.OK,
        data: publicacionActualizada,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getPublicacionesAgrupadasPorTipo() {
    try {
      const publicacionesAgrupadas = await this.publicacionRepository.createQueryBuilder('publicacion')
        .select('animalTipo.tipo_nombre', 'tipo_animal')
        .addSelect('COUNT(*)', 'total_publicaciones')
        .leftJoin('publicacion.animal', 'animal')
        .leftJoin('animal.tipo', 'animalTipo')
        .groupBy('animalTipo.tipo_nombre')
        .getRawMany();
  
      return {
        message: 'Publicaciones agrupadas por tipo de animal',
        statusCode: HttpStatus.OK,
        data: publicacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getPublicacionesAgrupadasPorTipoPorFecha(startDate: Date, endDate: Date) {
    try {

      const startDateWithoutTime = new Date(startDate);
      startDateWithoutTime.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00
  
      const endDateWithoutTime = new Date(endDate);
      endDateWithoutTime.setHours(23, 59, 59, 999);

      const publicacionesAgrupadas = await this.publicacionRepository.createQueryBuilder('publicacion')
        .select('animalTipo.tipo_nombre', 'tipo_animal')
        .addSelect('COUNT(*)', 'total_publicaciones')
        .leftJoin('publicacion.animal', 'animal')
        .leftJoin('animal.tipo', 'animalTipo')
        .where('publicacion.publicacion_fecha BETWEEN :startDate AND :endDate', {
          startDate: startDateWithoutTime.toISOString(),
          endDate: endDateWithoutTime.toISOString(),
        })
        .groupBy('animalTipo.tipo_nombre')
        .getRawMany();
  
      return {
        message: 'Publicaciones agrupadas por tipo de animal',
        statusCode: HttpStatus.OK,
        data: publicacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getPublicacionesAgrupadasPorEstado() {
    try {
      const publicacionesAgrupadas = await this.publicacionRepository.createQueryBuilder('publicacion')
        .select('animalEstado.estado_nombre', 'estado_animal')
        .addSelect('COUNT(*)', 'total_publicaciones')
        .leftJoin('publicacion.animal', 'animal')
        .leftJoin('animal.estado', 'animalEstado')
        .groupBy('animalEstado.estado_nombre')
        .getRawMany();
  
      return {
        message: 'Publicaciones agrupadas por tipo de animal',
        statusCode: HttpStatus.OK,
        data: publicacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getPublicacionesAgrupadasPorEstadoPorFecha(startDate: Date, endDate: Date) {
    try {

      const startDateWithoutTime = new Date(startDate);
      startDateWithoutTime.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00
  
      const endDateWithoutTime = new Date(endDate);
      endDateWithoutTime.setHours(23, 59, 59, 999);

      const publicacionesAgrupadas = await this.publicacionRepository.createQueryBuilder('publicacion')
        .select('animalEstado.estado_nombre', 'estado_animal')
        .addSelect('COUNT(*)', 'total_publicaciones')
        .leftJoin('publicacion.animal', 'animal')
        .leftJoin('animal.estado', 'animalEstado')
        .where('publicacion.publicacion_fecha BETWEEN :startDate AND :endDate', {
          startDate: startDateWithoutTime.toISOString(),
          endDate: endDateWithoutTime.toISOString(),
        })
        .groupBy('animalEstado.estado_nombre')
        .getRawMany();
  
      return {
        message: 'Publicaciones agrupadas por tipo de animal',
        statusCode: HttpStatus.OK,
        data: publicacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
  

}
