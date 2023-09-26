import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    async createUser(@Body() user: CreateUserDto){
        return this.authService.register(user)
    }

    @Post('login')
    async login(@Body() user: loginDto){
        return this.authService.login(user)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req){
        console.log(req.user)
        return 'profile'
    }
}
