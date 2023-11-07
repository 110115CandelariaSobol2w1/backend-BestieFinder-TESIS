import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { RefugiosService } from './refugios.service';
import { CreateRefugioDto } from './dto/create-refugio.dto';
import { UpdateRefugioDto } from './dto/update-refugio.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('refugios')
export class RefugiosController {
  constructor(private readonly refugiosService: RefugiosService) {}

  @Post()
  create(@Body() createRefugioDto: CreateRefugioDto) {
    return this.refugiosService.createRefugio(createRefugioDto);
  }

  @UseGuards(AuthGuard)
  @Post('userRefugio')
  createRefugioAndUser(@Body() createData:any, @Request() req) {
    return this.refugiosService.createRefugioAndUser(createData,req);
  }

  @Get()
  findAll() {
    return this.refugiosService.findAll();
  }

  @Get('castraciones')
  findrefugiosCastraciones() {
    return this.refugiosService.findRefugiosCastracciones();
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.refugiosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRefugioDto: UpdateRefugioDto) {
    return this.refugiosService.updateRefugio(id, updateRefugioDto);
  }



}
