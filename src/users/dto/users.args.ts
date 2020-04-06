//users/dto/users.args.ts
import {ArgsType, Field, Int} from '@nestjs/graphql';
import {Max, Min} from 'class-validator';

@ArgsType()
export class UsersArgs {

    @Field(type => Int, {defaultValue: 0, description: "Define how many records to skip"})
    @Min(0)
    skip: number = 0;

    @Field(type => Int, {defaultValue: 25, description: "Define how many record to take"})
    @Min(1)
    @Max(50)
    take: number = 25;
}