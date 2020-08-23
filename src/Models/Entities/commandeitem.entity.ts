import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";

import Commande from "./commande.entity";
import Item from "./item.entity";

@Entity()
class CommandeItem {

    @PrimaryGeneratedColumn()
    public id!: number

   @Column()
   public commandeId!: number;

   @Column()
   public itemId!: number;

    @Column()
    public quantity!: number;

    @ManyToOne(type => Commande, commande => commande.commandeitem, { onDelete: "CASCADE" })
    public commande!: Commande;

    @ManyToOne(type => Item, item => item.commandeitem, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    public item!: Item;
}

export default CommandeItem;