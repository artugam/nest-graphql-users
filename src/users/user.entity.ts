//users/user.entity.rs

import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string | null;

    @Column({nullable: true})
    lastName: string | null;

    @Column({nullable: true, unique: true})
    email: string;
}