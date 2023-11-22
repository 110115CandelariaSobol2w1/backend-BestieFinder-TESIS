import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('animales')
export class AnimalesController {
  constructor(private readonly animalesService: AnimalesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnimaleDto: CreateAnimaleDto, @Request() req) {
    return this.animalesService.create(createAnimaleDto,req);
  }

  @Get()
  findAll() {
    return this.animalesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/misMascotas')
  findMisMascotas(@Request() req) {
    return this.animalesService.findMisMascotas(req);
  }

  @Get('/adopcion')
  animalesAdopcion() {
    return this.animalesService.getanimalesAdopcion();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateAnimal(@Param('id') id:number, @Body() updateAnimal: UpdateAnimaleDto, @Request() req){
    return this.animalesService.updateAnimal(id,updateAnimal,req)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteAnimal(@Param('id') id:number, @Request() req){
    return this.animalesService.deleteAnimal(id,req)
  }

  @UseGuards(AuthGuard)
  @Patch('adoptado/:id')
  updateAnimalAdoptado(@Param('id') id:number,@Request() req){
    return this.animalesService.updateAnimalAdoptado(id,req)
  }

  @UseGuards(AuthGuard)
  @Patch('familia/:id')
  updateAnimalPerdidoEncontrado(@Param('id') id:number,@Request() req){
    return this.animalesService.updateAnimalPerdidoEncontrado(id,req)
  }


  
}
