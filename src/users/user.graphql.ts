//user.graphql.ts
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class UserGraphql {

    @Field(type => Number)
    id: number;

    @Field({nullable: true})
    firstName: string | null;

    @Field({ nullable: true })
    lastName: string | null;

    @Field()
    email: string;
}