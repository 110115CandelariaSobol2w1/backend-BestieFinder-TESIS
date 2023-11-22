import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { turnosRepository } from './turnos.repository';

@Injectable()
export class TurnosService {

  constructor(private readonly turnoRepository: turnosRepository){}

  async create(createTurnoDto: CreateTurnoDto, req) {
    return await this.turnoRepository.nuevoTurno(createTurnoDto,req) ;
  }

  findAll() {
    return `This action returns all turnos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turno`;
  }

  update(id: number, updateTurnoDto: UpdateTurnoDto) {
    return `This action updates a #${id} turno`;
  }

  remove(id: number) {
    return `This action removes a #${id} turno`;
  }
}
