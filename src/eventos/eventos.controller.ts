import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEventoDto: CreateEventoDto, @Request() req ) {
    return this.eventosService.create(createEventoDto, req);
  }

  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventosService.remove(id);
  }
}
