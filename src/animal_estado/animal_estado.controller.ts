import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalEstadoService } from './animal_estado.service';
import { CreateAnimalEstadoDto } from './dto/create-animal_estado.dto';
import { UpdateAnimalEstadoDto } from './dto/update-animal_estado.dto';

@Controller('animal-estado')
export class AnimalEstadoController {
  constructor(private readonly animalEstadoService: AnimalEstadoService) {}

  @Post()
  create(@Body() createAnimalEstadoDto: CreateAnimalEstadoDto) {
    return this.animalEstadoService.create(createAnimalEstadoDto);
  }

  @Get()
  findAll() {
    return this.animalEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalEstadoDto: UpdateAnimalEstadoDto) {
    return this.animalEstadoService.update(+id, updateAnimalEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalEstadoService.remove(+id);
  }
}
