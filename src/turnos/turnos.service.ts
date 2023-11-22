import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { turnosRepository } from './turnos.repository';
import { turnosDisponiblesDto } from './dto/turnos-disponibles.dto';

@Injectable()
export class TurnosService {

  constructor(private readonly turnoRepository: turnosRepository){}

  async create(createTurnoDto: CreateTurnoDto, req) {
    return await this.turnoRepository.nuevoTurno(createTurnoDto,req) ;
  }

  async findAll(turnosDisponibles: turnosDisponiblesDto) {
    return await this.turnoRepository.getHorariosDisponibles(turnosDisponibles);
  }

  findOne(id: number) {
    return `This action returns a #${id} turno`;
  }

  remove(id: number) {
    return `This action removes a #${id} turno`;
  }
}
