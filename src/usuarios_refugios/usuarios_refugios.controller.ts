import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { UsuariosRefugiosService } from './usuarios_refugios.service';
import { CreateUsuariosRefugioDto } from './dto/create-usuarios_refugio.dto';
import { UpdateUsuariosRefugioDto } from './dto/update-usuarios_refugio.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('usuarios-refugios')
export class UsuariosRefugiosController {
  constructor(private readonly usuariosRefugiosService: UsuariosRefugiosService) {}

  @UseGuards(AuthGuard)
  @Get('solicitudes')
  getSolicitudes(@Request() req){
    return this.usuariosRefugiosService.getSolicitudes(req);
  }
  
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUsuariosRefugioDto: CreateUsuariosRefugioDto, @Request() req) {
    return this.usuariosRefugiosService.create(createUsuariosRefugioDto, req);
  }

  @UseGuards(AuthGuard)
  @Get('/voluntario')
  perteneceRefugio(@Request() req){
    return this.usuariosRefugiosService.perteneceRefugio(req);
  }

  @UseGuards(AuthGuard)
  @Get('owner')
  isOwner(@Request() req){
    return this.usuariosRefugiosService.isOwner(req);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserAndRefugio(@Request() req){
    return this.usuariosRefugiosService.getUserAndRefugio(req);
  }

  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.usuariosRefugiosService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Patch('confirmar/:id')
  confirmarUsuario(@Param('id') id:number, @Request() req){
    return this.usuariosRefugiosService.confirmarUsuarioRefugio(id,req);
  }

  @UseGuards(AuthGuard)
  @Patch('cancelar/:id')
  cancelarUsuario(@Param('id') id:number, @Request() req){
    return this.usuariosRefugiosService.cancelarUsuarioRefugio(id,req);
  }

}
