import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class userRepository{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async createUser(user: CreateUserDto){
        const {email} = user;
        const userExist = await this.userRepository.findOneBy({email: email})

        if(userExist){
          throw new BadRequestException('Ya existe un usuario con ese email')  
        }
        const {password} = user; //destructuramos el obj user para obtener la pass
        const hashPassword = await bcryptjs.hash(password,10) //hasheamos la pass
        user = {...user,password: hashPassword} //Actualizamos el user para reemplazar el valor de pass
        const newUSer = this.userRepository.create(user);
        return this.userRepository.save(newUSer)
        .then(() => {
            return {
                message: 'Usuario creado satisfactoriamente',
                statusCode: HttpStatus.CREATED,
              };
        })
        .catch((error) => {
            throw new BadRequestException({
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message,
              error: 'Error Interno del Servidor',
            });
        });
    }

    async findUserByEmail(email:string){
        const user = this.userRepository.findOneBy({email: email})
        return user;
    }

}