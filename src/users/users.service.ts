//users/users.service.ts
import { Injectable } from '@nestjs/common';
import {UserEntity} from './user.entity';
import {UserInput} from './dto/user.input';
import {UsersRepository} from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {
    }

    async create(userInput: UserInput): Promise<UserEntity>{
        const user = new UserEntity();
        this.fillUser(userInput, user);
        return this.usersRepository.save(user);
    }

    async update(id: number, userInput: UserInput): Promise<UserEntity>{
        const user = await this.usersRepository.findOneOrFail({id});
        this.fillUser(userInput, user);
        return this.usersRepository.save(user);
    }

    fillUser(userInput: UserInput, user: UserEntity) : void{
        user.firstName = userInput.firstName;
        user.lastName = userInput.lastName;
        user.email = userInput.email;
    }
}
