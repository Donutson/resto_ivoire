import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";

import TypeUser from "./typeuser.entity";
import Commande from "./commande.entity";

@Entity()
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column()
    phone: string;

    @ManyToOne(type => TypeUser, typeuser => typeuser.user )
    status: TypeUser;

    @OneToMany(type => Commande, commande => commande.user )
    commandeuser: Commande[];

    @OneToMany(type => Commande, commande => commande.taker )
    commandetaker: Commande[];

    @OneToMany(type => Commande, commande => commande.achiever )
    commandeachiever: Commande[];

    @OneToMany(type => Commande, commande => commande.sender )
    commandesender: Commande[];

}

export default User;