import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsuariosRefugiosService } from './usuarios_refugios.service';
import { CreateUsuariosRefugioDto } from './dto/create-usuarios_refugio.dto';
import { UpdateUsuariosRefugioDto } from './dto/update-usuarios_refugio.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('usuarios-refugios')
export class UsuariosRefugiosController {
  constructor(private readonly usuariosRefugiosService: UsuariosRefugiosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUsuariosRefugioDto: CreateUsuariosRefugioDto, @Request() req) {
    return this.usuariosRefugiosService.create(createUsuariosRefugioDto, req);
  }

  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.usuariosRefugiosService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosRefugiosService.findOne(+id);
  }

  @Post('confirmar/:id')
  confirmarUsuario(@Param('id') id:number, @Request() req){
    return this.usuariosRefugiosService.confirmarUsuarioRefugio(id,req);
  }

  @Post('cancelar/:id')
  cancelarUsuario(@Param('id') id:number, @Request() req){
    return this.usuariosRefugiosService.cancelarUsuarioRefugio(id,req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuariosRefugioDto: UpdateUsuariosRefugioDto) {
    return this.usuariosRefugiosService.update(+id, updateUsuariosRefugioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosRefugiosService.remove(+id);
  }
}