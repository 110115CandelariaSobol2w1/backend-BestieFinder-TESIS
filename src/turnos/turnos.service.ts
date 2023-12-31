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

  async findOne(req) {
    return await this.turnoRepository.getTurnosPorUsuario(req);
  }

  async findTurnosRefugio(req) {
    return await this.turnoRepository.getTurnosPorRefugio(req);
  }

  remove(id: number) {
    return `This action removes a #${id} turno`;
  }
}
