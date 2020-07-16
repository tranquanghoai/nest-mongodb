import { IsString, MinLength, MaxLength } from 'class-validator'

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string
}