import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Schema()
export class User extends Document {
    @Prop({ unique: true })
    email: string

    @Prop()
    password: string

    @Prop()
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

}

export const UserSchema = SchemaFactory.createForClass(User)