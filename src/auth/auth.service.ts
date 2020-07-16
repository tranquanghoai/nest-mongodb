import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentials
        const createdUser = new this.userModel({ email })
        try {
            const salt = await bcrypt.genSalt()
            createdUser.salt = salt
            createdUser.password = await this.hashPassword(password, salt)
            await createdUser.save()
            return createdUser
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException()
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async validateUserPassword(authCredentials: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentials
        const user = await this.userModel.findOne({ email })
        console.log(user, 'user')
        if (user && user.validatePassword(password)) {
            return user
        }
        return null
    }


    private hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}
