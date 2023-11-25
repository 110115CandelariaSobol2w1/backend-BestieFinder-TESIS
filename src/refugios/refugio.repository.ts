import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Refugio } from './entities/refugio.entity';
import { Repository } from 'typeorm';
import { CreateRefugioDto } from './dto/create-refugio.dto';
import { UpdateRefugioDto } from './dto/update-refugio.dto';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';

@Injectable()
export class refugioRepository {
  constructor(
    @InjectRepository(Refugio) private refugioRepository: Repository<Refugio>,
    @InjectRepository(UsuariosRefugio) private userRefugioRepository: Repository<UsuariosRefugio>
  ) {}

  async findAll() {
    try {
      const refugios = await this.refugioRepository.find();
      return {
        message: 'Refugios',
        statusCode: HttpStatus.OK,
        data: refugios,
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
      const refugios = await this.refugioRepository.findOne({
        where: {
          refugio_id: id,
        },
      });
      return {
        message: 'Refugio',
        statusCode: HttpStatus.OK,
        data: refugios,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async createRefugio(refugio: CreateRefugioDto){
    const newRefugio = this.refugioRepository.create(refugio);
    return this.refugioRepository
      .save(newRefugio)
      .then(() => {
        return {
          message: 'Refugio creado satisfactoriamente',
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

  async updateRefugio(id: number, refugioUpdate: UpdateRefugioDto){
    try {
  
      const refugio = await this.refugioRepository.findOne({
        where: {
          refugio_id:id,
        },
      });
  
      if (!refugio) {
        throw new NotFoundException('Refugio no encontrado');
      }
  
     refugio.refugio_nombre = refugioUpdate.refugio_nombre;
     refugio.refugio_pais = refugioUpdate.refugio_pais;
     refugio.refugio_ciudad = refugioUpdate.refugio_ciudad;
     refugio.refugio_ciudad = refugioUpdate.refugio_ciudad;
     refugio.refugio_telefono = refugioUpdate.refugio_telefono;
     refugio.refugio_descripcion = refugioUpdate.refugio_descripcion;
     refugio.refugio_castraciones = refugioUpdate.refugio_castraciones;
  
      await this.refugioRepository.save(refugio);
  
      return {
        message: 'Refugio actualizado exitosamente',
        statusCode: HttpStatus.OK,
        data: refugio,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async findRefugiosCastraciones(){
    try {
      const refugios = await this.refugioRepository.find({
        where: {
          refugio_castraciones: true,
        },
      });
      return {
        message: 'Refugios',
        statusCode: HttpStatus.OK,
        data: refugios,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async createRefugioAndUser(createData: any, req){
    const { userId } = req.user;

    try {
      const newRefugio = this.refugioRepository.create(createData);
      const refugio = await this.refugioRepository.save(newRefugio);

      // Crear el user refugio vinculado al refugio y al usuario
      const newUserRefugio = this.userRefugioRepository.create({
        ...createData,
        refugio_id: refugio,
        user_id: userId,
        ref_user_owner: true,
        ref_user_confirmado: true
      });
      await this.userRefugioRepository.save(newUserRefugio);

      return {
        message: 'Refugio y user_refugio creados satisfactoriamente',
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

}
