import { Injectable } from '@nestjs/common';
import { CreateUsuariosRefugioDto } from './dto/create-usuarios_refugio.dto';
import { UpdateUsuariosRefugioDto } from './dto/update-usuarios_refugio.dto';
import { userRefugiosRepository } from './usuarios_refugio.repository';

@Injectable()
export class UsuariosRefugiosService {

  constructor(private readonly userRefugioRepository: userRefugiosRepository){}

  //si
  async create(createUsuariosRefugioDto: CreateUsuariosRefugioDto, req) {
    return await this.userRefugioRepository.createUserRefugio(createUsuariosRefugioDto, req);
  }

  //si
  async findAll(id: number) {
    return await this.userRefugioRepository.getUserByRefugio(id);
  }

  //si
  async confirmarUsuarioRefugio(id: number, req){
    return await this.userRefugioRepository.confirmarUsuarioRefugio(id,req);
  }

  //si
  async cancelarUsuarioRefugio(id:number, req){
    return await this.userRefugioRepository.cancelarUsuarioRefugio(id,req);
  }

  //si
  async getSolicitudes(req){
    return await this.userRefugioRepository.getsolicitudes(req);
  }

  //si
  async isOwner(req){
    return await this.userRefugioRepository.isOwner(req);
  }

  //si
  async perteneceRefugio(req){
    return await this.userRefugioRepository.perteneceRefugio(req);
  }

  //si
  async getUserAndRefugio(req){
    return await this.userRefugioRepository.getUserAndRefugio(req);
  }

}
