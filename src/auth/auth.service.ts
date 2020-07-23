import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const bcryptjs = require('bcryptjs');
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentials
        console.log(email, password)
        try {
            const createdUser = new this.userModel({ email })
            var salt = bcryptjs.genSaltSync(10);
            createdUser.password = bcryptjs.hashSync(password, salt);
            await createdUser.save()
            return createdUser
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException({
                    messageNode: 'AUTH',
                    message: 'USER_EXITS'
                })
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, password } = authCredentials
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException({
                messageNode: "AUTH",
                message: 'USERNAME_NOT_EXITS'
            })
        }
        const matchPassword = await bcryptjs.compare(password, user.password)
        if (!matchPassword) {
            throw new UnauthorizedException({
                messageNode: "AUTH",
                message: 'WRONG_PASSWORD'
            })
        }
        const jwtPayload: JwtPayload = { email }
        const accessToken = await this.jwtService.sign(jwtPayload)
        return { accessToken }
    }
}
