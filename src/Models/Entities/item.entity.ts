import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";

import Category from "./category.entity";
import CommandeItem from "./commandeitem.entity";

@Entity()
class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @ManyToOne(type => Category, category => category.item, { onDelete: "CASCADE" })
    category: Category;

    @OneToMany(type => CommandeItem, commandeitem => commandeitem.item)
    public commandeitem!: CommandeItem[];

}

export default Item;