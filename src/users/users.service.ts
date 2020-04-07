//users/users.service.ts
import {BadRequestException, Injectable} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {UserInput} from './dto/user.input';
import {UsersRepository} from './users.repository';
import {Not, Equal} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {
    }

    async create(userInput: UserInput): Promise<UserEntity>{
        const anotherUserWithGivenMail = await this.usersRepository.findOne({email: userInput.email});
        if(anotherUserWithGivenMail) {
            throw new BadRequestException('Another user with given email already exists');
        }
        const user = new UserEntity();
        this.fillUser(userInput, user);
        return this.usersRepository.save(user);
    }

    async update(id: number, userInput: UserInput): Promise<UserEntity>{
        const anotherUserWithGivenMail = await this.usersRepository.findOne({
            where: {
                id: Not(Equal(id)),
                email: Equal(userInput.email)
            }
        });
        if(anotherUserWithGivenMail) {
            throw new BadRequestException('Another user with given email already exists');
        }
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
