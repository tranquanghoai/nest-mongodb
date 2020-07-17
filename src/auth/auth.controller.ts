import { Controller, Post, Body, ValidationPipe, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentials)
    }

    @Post('signin')
    async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentials)
    }

}
