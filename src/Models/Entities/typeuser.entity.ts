import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

import User from "./user.entity";

@Entity()
class TypeUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.status )
    user: User[];
}

export default TypeUser;