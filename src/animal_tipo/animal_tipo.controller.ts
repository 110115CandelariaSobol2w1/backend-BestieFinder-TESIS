import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalTipoService } from './animal_tipo.service';
import { CreateAnimalTipoDto } from './dto/create-animal_tipo.dto';
import { UpdateAnimalTipoDto } from './dto/update-animal_tipo.dto';

@Controller('animal-tipo')
export class AnimalTipoController {
  constructor(private readonly animalTipoService: AnimalTipoService) {}

  @Post()
  create(@Body() createAnimalTipoDto: CreateAnimalTipoDto) {
    return this.animalTipoService.create(createAnimalTipoDto);
  }

  @Get()
  findAll() {
    return this.animalTipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalTipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalTipoDto: UpdateAnimalTipoDto) {
    return this.animalTipoService.update(+id, updateAnimalTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalTipoService.remove(+id);
  }
}
