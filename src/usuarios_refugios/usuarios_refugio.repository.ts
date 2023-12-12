import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRefugio } from './entities/usuarios_refugio.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateUsuariosRefugioDto } from './dto/create-usuarios_refugio.dto';

@Injectable()
export class userRefugiosRepository {
  constructor(
    @InjectRepository(UsuariosRefugio)
    private userRefugioRepository: Repository<UsuariosRefugio>,
  ) {}

  async createUserRefugio(userRefugioDto: CreateUsuariosRefugioDto, req) {
    const { userId } = req.user;

    try {
      const user = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
        },
      });

      if (user && user.ref_user_confirmado === true) {
        return 'El usuario ya pertenece a otro refugio';
      }

      const newUserRefugio = this.userRefugioRepository.create({
        ...userRefugioDto,
        user_id: userId,
        ref_user_owner: false,
        ref_user_confirmado: false,
      });

      await this.userRefugioRepository.save(newUserRefugio);

      return {
        message: 'User_refugio creado satisfactoriamente',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getUserByRefugio(id: number) {
    try {
      const user = await this.userRefugioRepository.find({
        where: {
          refugio_id: id,
        },
        relations: {
          refugio: true,
          usuario: true,
        },
      });
      return {
        message: 'Usuarios refugios',
        statusCode: HttpStatus.OK,
        data: user,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async confirmarUsuarioRefugio(id: number, req) {
    const { userId } = req.user;

    try {
      const userOwner = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
        },
      });

      if (userOwner.ref_user_owner === false) {
        return 'No tenes permisos para confirmar un usuario en el refugio';
      }

      const userRefugio = await this.userRefugioRepository.findOne({
        where: {
          user_id: id,
          refugio_id: userOwner.refugio_id
        },
      });

      if (userRefugio.ref_user_confirmado === null) {
        userRefugio.ref_user_confirmado = true;
        await this.userRefugioRepository.save(userRefugio);
      }

      return {
        message: 'Usuario confirmado',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async cancelarUsuarioRefugio(id: number, req) {
    const { userId } = req.user;

    try {
      const userOwner = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
        },
      });

      if (userOwner.ref_user_owner === false) {
        return 'No tenes permisos para confirmar un usuario en el refugio';
      }

      const userRefugio = await this.userRefugioRepository.findOne({
        where: {
          user_id: id,
          refugio_id: userOwner.refugio_id
        },
      });

      if (userRefugio.ref_user_confirmado === null) {
        userRefugio.ref_user_confirmado = false;
        await this.userRefugioRepository.save(userRefugio);
      }

      return {
        message: 'Usuario cancelado',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getsolicitudes(req){
    const { userId } = req.user;

    try {
      const userOwner = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
        }
      });

      console.log(userOwner)

      if (userOwner.ref_user_owner === false) {
        return 'No tenes permisos para confirmar un usuario en el refugio';
      }

      const solicitudes = await this.userRefugioRepository.find({
        where: {
          refugio_id: userOwner.refugio_id,
          ref_user_confirmado: IsNull()
        },
        relations: {
          usuario: true
        }
      });

      return {
        message: 'Solicitudes pendientes',
        data: solicitudes,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async isOwner(req){
    const { userId } = req.user;
  
    try {
      const user = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
          ref_user_owner: true
        }
      });

      if(user){
        return true
      } 

      return false

    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async perteneceRefugio(req){
    const { userId } = req.user;
  
    try {
      const user = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId
        }
      });

      if(user){
        return true
      } 

      return false

    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [`${error.message}`],
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getUserAndRefugio(req){
    const { userId } = req.user;

    console.log("hola")
    try {
      const userRefugio = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
          ref_user_owner: false
        },
        relations: {
          refugio: true
        }
      });

      console.log(userRefugio)

      return {
        message: 'Refugio del usuario',
        data: userRefugio,
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
