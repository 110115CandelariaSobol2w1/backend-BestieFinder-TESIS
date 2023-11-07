import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class eventoRepository {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    @InjectRepository(UsuariosRefugio)
    private userRefugioRepository: Repository<UsuariosRefugio>,
  ) {}

  async createEvento(createEvento: CreateEventoDto, req) {
    const { userId } = req.user;
    const usuarioRefugio = await this.userRefugioRepository.findOne({
      where: { user_id: userId },
    });

    console.log(usuarioRefugio.refugio_id);
    createEvento.refugio_id = usuarioRefugio.refugio_id;
    console.log(createEvento.refugio_id);

    if (
      !usuarioRefugio ||
      usuarioRefugio.refugio_id !== createEvento.refugio_id
    ) {
      throw new BadRequestException('No puede crear un evento');
    }

    const newEvento = this.eventoRepository.create({
      ...createEvento,
      refugio_id: usuarioRefugio.refugio_id,
    });

    await this.eventoRepository.save(newEvento);
    return this.eventoRepository
      .save(newEvento)
      .then(() => {
        return {
          message: 'Evento creado satisfactoriamente',
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

  async getEventoById(id: number) {
    try {
      const eventos = await this.eventoRepository.findOne({
        where: {
          evento_id: id,
        },
      });
      return {
        message: 'Usuario',
        statusCode: HttpStatus.OK,
        data: eventos,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getEventos(){
    try {
      const eventos = await this.eventoRepository.find();
      return {
        message: 'Eventos',
        statusCode: HttpStatus.OK,
        data: eventos,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.code} ${error.detail}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async updateEvento(id:number, updateEventoDto: UpdateEventoDto){

    try {
      const evento = await this.eventoRepository.findOne({
        where:{
          evento_id: id,
        },
      });
  
      if(!evento){
        throw new NotFoundException('Evento no encontrado')
      }
  
      const eventoActualizado = Object.assign(evento, updateEventoDto);
      await this.eventoRepository.save(eventoActualizado)

      return {
        message: 'evento actualizado exitosamente',
        statusCode: HttpStatus.OK,
        data: eventoActualizado,
      };

    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async deleteEvento(id:number){
    try {

      const evento = await this.eventoRepository.findOne({
        where: {
          evento_id: id,
        },
      });

      if(!evento){
        return('Evento no encontrado')
      }

      await this.eventoRepository.remove(evento);

      return {
        message: 'Evento eliminado con exito',
        statusCode: HttpStatus.OK,
        data: evento,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }
}
