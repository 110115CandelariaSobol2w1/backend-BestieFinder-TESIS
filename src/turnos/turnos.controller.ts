import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { turnosDisponiblesDto } from './dto/turnos-disponibles.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto, @Request() req) {
    return this.turnosService.create(createTurnoDto, req);
  }

  @Get()
  findAll(@Body() turnoDispnible: turnosDisponiblesDto) {
    return this.turnosService.findAll(turnoDispnible);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
