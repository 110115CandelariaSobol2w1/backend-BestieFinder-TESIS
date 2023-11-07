import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { eventoRepository } from './evento.repository';

@Injectable()
export class EventosService {

  constructor(
    private readonly eventoRepository: eventoRepository
  ){}
  
  async create(createEventoDto: CreateEventoDto, req) {
    return await this.eventoRepository.createEvento(createEventoDto,req);
  }

  async findAll() {
    return await this.eventoRepository.getEventos()
  }

  async findOne(id: number) {
    return await this.eventoRepository.getEventoById(id);
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    return await this.eventoRepository.updateEvento(id, updateEventoDto);
  }

  async remove(id: number) {
    return await this.eventoRepository.deleteEvento(id);
  }
}
