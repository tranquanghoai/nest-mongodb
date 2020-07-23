import { Controller, Post, Body, ValidationPipe, NotFoundException, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './schema/auth.schema';
// import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
// @UseFilters(new HttpExceptionFilter())
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

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user) {
        console.log(user)
    }

}
