import { Injectable } from '@nestjs/common';
import { CreatePublicacioneDto } from './dto/create-publicacione.dto';
import { UpdatePublicacioneDto } from './dto/update-publicacione.dto';
import { publicacionRepository } from './publicacion.repository';
import { CreateAnimaleDto } from 'src/animales/dto/create-animale.dto';
import { start } from 'repl';
import { MatchPublicacionDto } from './dto/match-publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(private readonly publicacionRepository: publicacionRepository) {}

  async create(createData: any,req,
  ) {
    return await this.publicacionRepository.createPublicacionAndAnimal(createData,req);
  }

  async findById(id:number) {
    return await this.publicacionRepository.findById(id);
  }

  async findByEstado(id: number) {
    return await this.publicacionRepository.findByEstadoAnimal(id);
  }

  async findByTipo(id: number) {
    return await this.publicacionRepository.findByTipoAnimal(id);
  }

  async getPerrosAdopcion(){
    return await this.publicacionRepository.getPerrosAdopcion();
  }

  async getGatosAdopcion(){
    return await this.publicacionRepository.getGatosAdopcion();
  }

  async getAvesAdopcion(){
    return await this.publicacionRepository.getAvesAdopcion();
  }

  async getOtrosAdopcion(){
    return await this.publicacionRepository.getOtrosAdopcion();
  }

  async getPerrosPerdidos(){
    return await this.publicacionRepository.getPerrosPerdidos();
  }

  async getGatosPerdidos(){
    return await this.publicacionRepository.getGatosPerdidos();
  }

  async getAvesPerdidas(){
    return await this.publicacionRepository.getAvesPerdidas();
  }

  async getOtrosPerdidos(){
    return await this.publicacionRepository.getOtrosPerdidos();
  }

  async getPerrosEncontrados(){
    return await this.publicacionRepository.getPerrosEncontrados();
  }

  async getGatosEncontrados(){
    return await this.publicacionRepository.getGatosEncontrados();
  }

  async getAvesEncontradas(){
    return await this.publicacionRepository.getAvesEncontradas();
  }

  async getOtrosEncontrados(){
    return await this.publicacionRepository.getOtrosEncontrados();
  }

  async update(id:number, updatePublicacion: UpdatePublicacioneDto, req) {
    return await this.publicacionRepository.updatePublicacion(id, updatePublicacion,req);
  }

  async remove(id: number, req) {
    return await this.publicacionRepository.deletePublicacionAndAnimal(id, req)
  }

  async getPublicacionesAgrupadasPorTipo(){
    return await this.publicacionRepository.getPublicacionesAgrupadasPorTipo();
  }

  async getPublicacionesAgrupadasPorTipoPorFecha(startDate: Date, endDate: Date){
    return await this.publicacionRepository.getPublicacionesAgrupadasPorTipoPorFecha(startDate, endDate);
  }

  async getPublicacionesAgrupadasPorEstado(){
    return await this.publicacionRepository.getPublicacionesAgrupadasPorEstado();
  }

  async getPublicacionesAgrupadasPorEstadoPorFecha(startDate: Date, endDate: Date){
    return await this.publicacionRepository.getPublicacionesAgrupadasPorEstadoPorFecha(startDate, endDate);
  }

  async getPublicacionesMatch(match: MatchPublicacionDto){
    return await this.publicacionRepository.getPublicacionesMatch(match)
  }

  
}
