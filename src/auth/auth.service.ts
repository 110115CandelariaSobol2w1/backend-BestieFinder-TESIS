import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { create } from 'domain';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { loginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService){}

    async register(createUserDto: CreateUserDto){
        console.log(createUserDto)
        return this.userService.create(createUserDto);
    }

    async login(loginDto: loginDto) {
        const { email, password } = loginDto;
        
        const user = await this.userService.findOneByEmail(email);
    
        if (!user) {
            return 'No existe un usuario con ese correo electrónico';
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordValid) {
            return { error: 'No existe un usuario con ese correo electrónico' };
        }
        // Si el usuario y la contraseña son válidos, generar un token JWT
        const payload = { userId: user.id, username: user.email };
        const token = await this.jwtService.signAsync(payload);
    
        // Devolver el token y el objeto de usuario
        return {
            user, token
        };
    }
    
}
