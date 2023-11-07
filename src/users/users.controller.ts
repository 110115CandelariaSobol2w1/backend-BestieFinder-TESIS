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
  @Get('id/:id')
  getUserById(@Param('id') id:number, @Request() req) {
    return this.usersService.getUserById(id, req);
  }

  @UseGuards(AuthGuard)
  @Patch('id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req){
    return this.usersService.updateUser(updateUserDto,req)
  }

}
