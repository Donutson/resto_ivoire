import ItemDAOImpl from "../../daoimpl/itemdaoimpl.model";

import Item from "../../Entities/item.entity";
import Category from "../../Entities/category.entity";

import {categorydao} from "../../../util";


class ItemDAO implements ItemDAOImpl {
	private connect;	

	constructor(connexion){
		this.connect = connexion;
	}

	//crée un item
	async create(item: Item): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(item)) == undefined;
		})
	}

	//trouve un item à partir de son id
	async find(id: number): Promise<Item>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Item, { relations: ["category"], where: {id: id}});
		})
	}

	//trouve tous les items associés à une catégorie à partir de l'id de la categorie
	async findForCategory(id: number): Promise<Item[]>{
		return this.connect.then(async connection =>{
			return await connection.manager.find(Item, { relations: ["category"], where: {category: id}});
		})
	}

	// met à jour un item
	async update(item: Item): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.save(item)) == undefined;
		})
	}

	// supprime un item
	async delete(item: Item): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(item)) == undefined;
		})
	}

}

export default ItemDAO;