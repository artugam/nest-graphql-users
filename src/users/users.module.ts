//users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersRepository} from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
