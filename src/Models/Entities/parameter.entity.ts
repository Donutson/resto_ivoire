import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";



@Entity()
class Parameter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    colorCategoryBox: string;

    @Column()
    colorCategory: string;

    @Column()
    colorCategoryText: string;

    @Column()
    colorItem: string;

    @Column()
    priceUnit: string;
}

export default Parameter;