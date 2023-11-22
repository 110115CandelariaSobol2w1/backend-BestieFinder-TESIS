import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto, @Request() req) {
    return this.turnosService.create(createTurnoDto, req);
  }

  @Get()
  findAll() {
    return this.turnosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
