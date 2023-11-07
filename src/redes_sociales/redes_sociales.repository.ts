import { InjectRepository } from '@nestjs/typeorm';
import { RedSocial } from './entities/redes_sociale.entity';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { CreateRedesSocialeDto } from './dto/create-redes_sociale.dto';
import { UpdateRedesSocialeDto } from './dto/update-redes_sociale.dto';

@Injectable()
export class redesRepository {
  constructor(
    @InjectRepository(RedSocial) private redesRepository: Repository<RedSocial>,
    @InjectRepository(Refugio) private refugioRepository: Repository<Refugio>,
  ) {}

  async createRedSocial(createRedSocialDto: CreateRedesSocialeDto) {

    try {
      const { refugio_id } = createRedSocialDto;

      const refugio = await this.refugioRepository.findOne({
        where: { refugio_id: refugio_id },
      });

      if (!refugio) {
        return ('Refugio no encontrado');
      }

      const nuevaRedSocial = await this.redesRepository.save(createRedSocialDto);

      return {
        message: 'Red social creada satisfactoriamente',
        statusCode: HttpStatus.CREATED,
        data: nuevaRedSocial
      };

    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.code} ${error.detail}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async updateRedSocial(id: number, updateRedesSociale: UpdateRedesSocialeDto){
    return await this.redesRepository
            .update({ redes_id: id}, updateRedesSociale)
            .then(() => {
                return {
                  message: 'Red actualizada satisfactoriamente',
                  statusCode: HttpStatus.CREATED,
                };
            })
            .catch((error) => {
                throw new BadRequestException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: [`${error.message}`],
                error: 'Error Interno del Servidor',
                });
            });
  }

  async findRedesByRefugio(id:number){
    try {
      const redes = await this.redesRepository.findOne({
        where: {
          refugio_id: id,
        },
      });
      return {
        message: 'Refugio',
        statusCode: HttpStatus.OK,
        data: redes,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async deleteRedSocial(id:number){
    try {
      const redes = await this.redesRepository.findOne({
        where: {
          redes_id: id,
        },
      });

      if(!redes){
        return('Red social no encontrada')
      }

      await this.redesRepository.remove(redes);

      return {
        message: 'Red social eliminada con exito',
        statusCode: HttpStatus.OK,
        data: redes,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }
}
