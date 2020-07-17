import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './jwt-payload.interface'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './auth.schema'
import { Model } from 'mongoose'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'tranquanghoai'
        })
    }

    async validate(payload: JwtPayload) {
        const { email } = payload
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}