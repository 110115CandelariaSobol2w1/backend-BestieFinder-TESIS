import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { CreateAnimalEstadoDto } from 'src/animal_estado/dto/create-animal_estado.dto';
import { CreateAnimaleDto } from 'src/animales/dto/create-animale.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { MatchPublicacionDto } from './dto/match-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createData:any, @Request() req) {
    return this.publicacionesService.create(createData, req);
  }

  @Get('byId/:id')
  findById(@Param('id') id:number) {
    return this.publicacionesService.findById(id);
  }

  @Get('byTipo/:id')
  findByTipo(@Param('id') id: number) {
    return this.publicacionesService.findByTipo(id);
  }

  @Get('byEstado/:id')
  findByEstado(@Param('id') id: number) {
    return this.publicacionesService.findByEstado(id);
  }

  @Get('adopcion/perros')
  getPerrosAdopcion() {
    return this.publicacionesService.getPerrosAdopcion();
  }

  @Get('adopcion/gatos')
  getGatosAdopcion() {
    return this.publicacionesService.getGatosAdopcion();
  }

  @Get('adopcion/aves')
  getAvesAdopcion() {
    return this.publicacionesService.getAvesAdopcion();
  }

  @Get('adopcion/otros')
  getOtrosAdopcion() {
    return this.publicacionesService.getOtrosAdopcion();
  }

  @Get('perdidos/perros')
  getPerrosPerdidos() {
    return this.publicacionesService.getPerrosPerdidos();
  }

  @Get('perdidos/gatos')
  getGatosPerdidos() {
    return this.publicacionesService.getGatosPerdidos();
  }

  @Get('perdidos/aves')
  getAvesPerdidas() {
    return this.publicacionesService.getAvesPerdidas();
  }

  @Get('perdidos/otros')
  getOtrosPerdidos() {
    return this.publicacionesService.getOtrosPerdidos();
  }

  @Get('encontrados/perros')
  getPerrosEncontrados() {
    return this.publicacionesService.getPerrosEncontrados();
  }

  @Get('encontrados/gatos')
  getGatosEncontrados() {
    return this.publicacionesService.getGatosEncontrados();
  }

  @Get('encontrados/aves')
  getAvesEncontradas() {
    return this.publicacionesService.getAvesEncontradas();
  }

  @Get('agrupadas')
  publicacionesAgrupadas() {
    return this.publicacionesService.getPublicacionesAgrupadasPorTipo();
  }

  @Get('agrupadas/estado')
  publicacionesAgrupadasEstado() {
    return this.publicacionesService.getPublicacionesAgrupadasPorEstado();
  }

  @Get('encontrados/otros')
  getOtrosEncontrados() {
    return this.publicacionesService.getOtrosEncontrados();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePublicacioneDto: UpdatePublicacioneDto, @Request() req) {
    return this.publicacionesService.update(id, updatePublicacioneDto, req);
  }

  @Get('match')
  getPublicacionesMatch(@Body() match: MatchPublicacionDto) {
    return this.publicacionesService.getPublicacionesMatch(match);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    return this.publicacionesService.remove(id,req);
  }

  @Get('agrupadas/:startDate/:endDate')
  async getDonacionesFecha(@Param('startDate') startDate:Date, @Param('endDate') endDate: Date){
    return this.publicacionesService.getPublicacionesAgrupadasPorTipoPorFecha(startDate,endDate);
  }

  @Get('agrupadas/estado/:startDate/:endDate')
  publicacionesAgrupadasEstadoPorFecha(@Param('startDate') startDate:Date, @Param('endDate') endDate: Date) {
    return this.publicacionesService.getPublicacionesAgrupadasPorEstadoPorFecha(startDate,endDate);
  }
}
