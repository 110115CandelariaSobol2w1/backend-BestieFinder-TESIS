import { Injectable } from '@nestjs/common';
import { CreateRefugioDto } from './dto/create-refugio.dto';
import { UpdateRefugioDto } from './dto/update-refugio.dto';
import { refugioRepository } from './refugio.repository';

@Injectable()
export class RefugiosService {

  constructor(
    private readonly refugiosRepository: refugioRepository
  ) {}

  async createRefugio(createRefugioDto: CreateRefugioDto) {
    return await this.refugiosRepository.createRefugio(createRefugioDto);
  }

  async findAll() {
    return await this.refugiosRepository.findAll()
  }

  async findOne(id: number) {
    return await this.refugiosRepository.findById(id)
  }

  async findRefugiosCastracciones(){
    return await this.refugiosRepository.findRefugiosCastraciones()
  }

  async updateRefugio(id: number, refugioUpdate: UpdateRefugioDto) {
    return await this.refugiosRepository.updateRefugio(id,refugioUpdate);
  }

  async createRefugioAndUser(createData: any, req){
    return await this.refugiosRepository.createRefugioAndUser(createData,req)
  }

  async getRefugio(req){
    return await this.refugiosRepository.getRefugio(req)
  }

}
