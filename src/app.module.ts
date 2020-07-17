import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest',
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  ), CatsModule, AuthModule],
})
export class AppModule { }
