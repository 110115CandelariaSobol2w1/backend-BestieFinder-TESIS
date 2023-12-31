import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userRepository } from './user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: userRepository){}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
  }

  async getUserById(req){
    return this.userRepository.getUserById(req)
  }

  async getUserMascotaById(id:number){
    return this.userRepository.getUserMascotaById(id)
  }

  async updateUser(updateUserDto: UpdateUserDto, req){
    return this.userRepository.updateUser(updateUserDto,req)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmail(email:string) {
    return this.userRepository.findUserByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
