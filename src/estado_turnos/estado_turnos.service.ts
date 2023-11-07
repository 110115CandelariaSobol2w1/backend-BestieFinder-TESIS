import { Injectable } from '@nestjs/common';
import { CreateEstadoTurnoDto } from './dto/create-estado_turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado_turno.dto';

@Injectable()
export class EstadoTurnosService {
  create(createEstadoTurnoDto: CreateEstadoTurnoDto) {
    return 'This action adds a new estadoTurno';
  }

  findAll() {
    return `This action returns all estadoTurnos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoTurno`;
  }

  update(id: number, updateEstadoTurnoDto: UpdateEstadoTurnoDto) {
    return `This action updates a #${id} estadoTurno`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoTurno`;
  }
}
