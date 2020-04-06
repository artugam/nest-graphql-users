//users/dto/user.input.ts
import {Field, InputType} from '@nestjs/graphql';
import {IsEmail, IsOptional, IsString} from 'class-validator';

@InputType()
export class UserInput {

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    lastName?: string;

    @Field()
    @IsEmail()
    email: string;
}