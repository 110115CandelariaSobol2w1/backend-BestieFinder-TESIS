import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
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

  @Get('disponibles')
  findAll(@Query() turnoDisponible: turnosDisponiblesDto) {
    return this.turnosService.findAll(turnoDisponible);
  }
  

  @UseGuards(AuthGuard)
  @Get('usuario')
  findOne(@Request() req) {
    return this.turnosService.findOne(req);
  }

  @UseGuards(AuthGuard)
  @Get('refugio')
  findTurnosRefugio(@Request() req) {
    return this.turnosService.findTurnosRefugio(req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
