import * as dotenv from 'dotenv';
import "reflect-metadata";
import {createConnection} from "typeorm";
import User from "./Entities/user.entity";
import TypeUser from "./Entities/typeuser.entity";
import Commande from "./Entities/commande.entity";
import Item from "./Entities/item.entity";
import CommandeItem from "./Entities/commandeitem.entity";
import Category from "./Entities/category.entity";
import Parameter from "./Entities/parameter.entity";


dotenv.config();



class Connexion
{
    private static HOST = process.env.DB_HOST || 'localhost';
    private static PORT = Number(process.env.DB_PORT) || 3306;
    private static USERNAME = process.env.DB_USER || 'root';
    private static PASSWORD = process.env.DB_PASS || '';
    private static DATABASE = process.env.DB_NAME || 'resto_ivoire';
    private static connect;

    private constructor(){

    }

    public static async getConnexion(){
        if(this.connect == undefined || this.connect == null){
            
            this.connect = await createConnection({
                type: "mysql",
                host: this.HOST,
                port: this.PORT,
                username: this.USERNAME,
                password: this.PASSWORD,
                database: this.DATABASE,
                entities: [User, TypeUser, Commande, CommandeItem, Item, Category, Parameter],
                synchronize: true,
            });

        }

        console.log("connexion à la base de donnée effectuée");
        return this.connect;
    }
}

export default Connexion;