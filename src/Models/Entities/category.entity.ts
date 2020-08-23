import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

import Item from  "./item.entity";

@Entity()
class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Item, item => item.category)
    item: Item[];
}

export default Category;