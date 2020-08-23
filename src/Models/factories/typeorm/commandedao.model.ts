import CommandeDAOImpl from "../../daoimpl/commandedaoimpl.model";

import Commande from "../../Entities/commande.entity";
import User from "../../Entities/user.entity";

import {IsNull, Not} from "typeorm";

import {CommandeAttr} from "../../../util";

class CommandeDAO implements CommandeDAOImpl {
	private connect;	

	constructor(connexion){
		this.connect = connexion;
	}

	//crée une commande
	async create(element: Commande): Promise<boolean>{
		
		return await this.connect.then(async connection =>{
			return await connection.manager.save(element) != undefined;
		});

		return false;
	}

	//retourne la connexion avec l'id spécifié si elle existe
	async find(id: number): Promise<Commande>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Commande, { 
				relations: ["user", "taker", "achiever", "sender"], 
				where: {id: id}
			});
		});
	}

	//retourne la dernière commande de l'utilisateur spécifiié
	async findLast(user: User): Promise<Commande>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Commande, { 
				where: {user: user },
				order: {dateCommande: "DESC" }
			});
		})
	}

	//retrouve les commandes dont l'attribut spécifié vaut NULL
	async findNull(attr: CommandeAttr): Promise<Commande[]>{

		return this.connect.then(async connection =>{
			
			switch(attr){
				case CommandeAttr.Take:

					return await connection.manager.find(Commande, { 
						relations: ["user", "taker", "achiever", "sender"], 
						where: {dateTake: IsNull()}
					});


				case CommandeAttr.Achieve:

					return await connection.manager.find(Commande, { 
						relations: ["user", "taker", "achiever", "sender"], 
						where: {dateTake: Not(IsNull()) ,dateAchieve: IsNull()}
					});

				case CommandeAttr.Send:

					return await connection.manager.find(Commande, { 
						relations: ["user", "taker", "achiever", "sender"], 
						where: {dateAchieve: Not(IsNull()) ,dateSender: IsNull()}
					});

			}

		});
	}

	//met à jour une commande
	async update(element: Commande): Promise<boolean>{
		
		return await this.connect.then(async connection =>{
			return await connection.manager.save(element) != undefined;
		});
		
	}

	//supprime une commande
	async delete(element: Commande): Promise<boolean>{
		
		return await this.connect.then(async connection =>{
			return await connection.manager.remove(element) != undefined;
		});

	}

}

export default CommandeDAO;