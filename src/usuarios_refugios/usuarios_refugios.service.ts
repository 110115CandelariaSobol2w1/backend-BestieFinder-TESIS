import { Injectable } from '@nestjs/common';
import { CreateUsuariosRefugioDto } from './dto/create-usuarios_refugio.dto';
import { UpdateUsuariosRefugioDto } from './dto/update-usuarios_refugio.dto';
import { userRefugiosRepository } from './usuarios_refugio.repository';

@Injectable()
export class UsuariosRefugiosService {

  constructor(private readonly userRefugioRepository: userRefugiosRepository){}

  async create(createUsuariosRefugioDto: CreateUsuariosRefugioDto, req) {
    return await this.userRefugioRepository.createUserRefugio(createUsuariosRefugioDto, req);
  }

  async findAll(id: number) {
    return await this.userRefugioRepository.getUserByRefugio(id);
  }

  async confirmarUsuarioRefugio(id: number, req){
    return await this.userRefugioRepository.confirmarUsuarioRefugio(id,req);
  }

  async cancelarUsuarioRefugio(id:number, req){
    return await this.userRefugioRepository.cancelarUsuarioRefugio(id,req);
  }

  findOne(id: number) {
    return `This action returns a #${id} usuariosRefugio`;
  }

  update(id: number, updateUsuariosRefugioDto: UpdateUsuariosRefugioDto) {
    return `This action updates a #${id} usuariosRefugio`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosRefugio`;
  }
}
