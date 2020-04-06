//app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersService } from './modules/users/users.service';
import { UsersResolver } from './modules/users/users.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type       : 'mysql',
      host       : 'localhost',
      port       : 3306,
      username   : 'root',
      password   : '',
      database   : 'graphql-article',
      entities   : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      charset    : 'utf8mb4_unicode_ci',
      logging    : true
    }),
    GraphQLModule.forRoot({
      debug         : true,
      playground    : true,
      autoSchemaFile: 'schema.gql'
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, UsersResolver],
})
export class AppModule {}
