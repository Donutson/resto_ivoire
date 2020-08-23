import CommandeItemDAOImpl from "../../daoimpl/commandeitemdaoimpl.model";
import CommandeItem from "../../Entities/commandeitem.entity";

class CommandeItemDAO implements CommandeItemDAOImpl {
	private connect;	

	constructor(connexion){
		this.connect = connexion;
	}

	//associe un item à une commande
	async create(element: CommandeItem): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	//trouve un item associe à une commande
	async find(id: number): Promise<CommandeItem>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(CommandeItem, id);
		})
	}

	//trouve tous les items associe à une commande à partir de l'id de la commande
	async findAll(commandeid: number): Promise<CommandeItem[]>{
		return this.connect.then(async connection =>{
			return await connection.manager.find(CommandeItem, {where: {commandeId: commandeid}});
		})
	}

	//met à jour un item associé à une commande
	async update(element: CommandeItem): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	//supprime un item associé à une commande
	async delete(element: CommandeItem): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(element)) == undefined;
		})
	}

}

export default CommandeItemDAO;