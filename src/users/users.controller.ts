import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getUserById(@Request() req) {
    return this.usersService.getUserById(req);
  }

  @Get(':id')
  getUserMascotaById(@Param('id') id:number) {
    return this.usersService.getUserMascotaById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req){
    return this.usersService.updateUser(updateUserDto,req)
  }

}
