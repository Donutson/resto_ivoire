import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";

import User from "./user.entity";
import CommandeItem from "./commandeitem.entity";

@Entity()
class Commande {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dateCommande: Date;    //date où la commande fut passée

    @Column()
    codeCommande: string;

    @ManyToOne(type => User, user => user.commandeuser, {nullable: false})
    user: User;	//le client ayant effectué la commande

    @ManyToOne(type => User, user => user.commandetaker)
    taker: User;	//le caissier ayant pris la commande

    @Column({nullable: true})
    dateTake: Date;    //date où la commande fut prise par les caissiers

    @ManyToOne(type => User, user => user.commandeachiever)
    achiever: User;	//le caissier ayant confirmer que la commande était prête

    @Column({nullable: true})
    dateAchieve: Date;    //date où la commande fut prête

    @ManyToOne(type => User, user => user.commandesender, { onDelete: "SET NULL" })
    sender: User;	//le caissier ayant confirmer que la commande fut recuperer par le client

    @Column({nullable: true})
    dateSender: Date;    //date où la commande fut recuperer par le client

    @OneToMany(type => CommandeItem, commandeitem => commandeitem.commande)
    public commandeitem!: CommandeItem[];

}

export default Commande;