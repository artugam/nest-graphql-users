//users/users.resolver.ts
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersArgs} from './dto/users.args';
import {UserEntity} from './user.entity';
import {UserGraphql} from './user.graphql';
import {UsersService} from './users.service';
import {UserInput} from './dto/user.input';
import {UsersRepository} from './users.repository';

@Resolver('Users')
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly usersRepository: UsersRepository
    ) {
    }

    @Query(returns => [UserGraphql], {
        description: "Get all users"
    })
    async getUsers(
        @Args() usersArgs: UsersArgs
    ): Promise<UserEntity[]> {
        return this.usersRepository.find({
            take: usersArgs.take,
            skip: usersArgs.skip,
        });
    }

    @Query(returns => UserGraphql)
    async getUser(
        @Args('id') id: number,
    ): Promise<UserEntity> {
        return this.usersRepository.findOne({id});
    }

    @Mutation(returns => UserGraphql)
    async createUser(
        @Args('user') userInput: UserInput,
    ): Promise<UserEntity> {
        return await this.usersService.create(userInput);
    }

    @Mutation(returns => UserGraphql)
    async updateUser(
        @Args('id') id: number,
        @Args('user') userInput: UserInput
    ): Promise<UserEntity> {
        return await this.usersService.update(id, userInput);
    }

    @Mutation(returns => Boolean)
    async removeUser(@Args('id') id: number) {
        await this.usersRepository.delete(id);
        return true;
    }


}
