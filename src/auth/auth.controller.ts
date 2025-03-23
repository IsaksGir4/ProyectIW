import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() body: {email: string; name: string; password: string; role: UserRole}){
        return this.authService.register(body.email, body.name, body.password, body.role);
    }

    @Post('login')
    login(@Body() body: {email: string, password: string}){
        return this.authService.login(body.email, body.password);
    }
}
