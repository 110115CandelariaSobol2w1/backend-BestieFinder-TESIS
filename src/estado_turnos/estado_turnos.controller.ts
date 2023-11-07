import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoTurnosService } from './estado_turnos.service';
import { CreateEstadoTurnoDto } from './dto/create-estado_turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado_turno.dto';

@Controller('estado-turnos')
export class EstadoTurnosController {
  constructor(private readonly estadoTurnosService: EstadoTurnosService) {}

  @Post()
  create(@Body() createEstadoTurnoDto: CreateEstadoTurnoDto) {
    return this.estadoTurnosService.create(createEstadoTurnoDto);
  }

  @Get()
  findAll() {
    return this.estadoTurnosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoTurnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoTurnoDto: UpdateEstadoTurnoDto) {
    return this.estadoTurnosService.update(+id, updateEstadoTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoTurnosService.remove(+id);
  }
}
