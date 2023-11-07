import { Injectable } from '@nestjs/common';
import { CreateRedesSocialeDto } from './dto/create-redes_sociale.dto';
import { UpdateRedesSocialeDto } from './dto/update-redes_sociale.dto';
import { redesRepository } from './redes_sociales.repository';

@Injectable()
export class RedesSocialesService {

  constructor(private readonly redesRepository: redesRepository){}

  async create(createRedesSocialeDto: CreateRedesSocialeDto) {
    return await this.redesRepository.createRedSocial(createRedesSocialeDto)
  }

 async findOne(id: number) {
    return await this.redesRepository.findRedesByRefugio(id)
  }

  async update(id: number, updateRedesSocialeDto: UpdateRedesSocialeDto) {
    return await this.redesRepository.updateRedSocial(id,updateRedesSocialeDto);
  }

  async delete(id:number){
    return await this.redesRepository.deleteRedSocial(id)
  }

}
