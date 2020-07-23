import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest',
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    ), CatsModule, AuthModule
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },]
})
export class AppModule { }
