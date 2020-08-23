import TypeUserDAOImpl from "../../daoimpl/typeuserdaoimpl.model";
import TypeUser from "../../Entities/typeuser.entity";


class TypeUserDAO implements TypeUserDAOImpl {
	private connect;	

	constructor(connexion){
		this.connect = connexion;
	}

	// crée un utilisateur
	async create(element: TypeUser): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

		// trouve un type d'utilisateur à partir de son id
	async find(id: number): Promise<TypeUser>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(TypeUser, id);
		})
	}

	// trouve un type d'utilisateur à partir de son nom
	async findByName(name: string): Promise<TypeUser>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(TypeUser, {where: {name: name}});
		})
		
	}

	// met à jour un type d'utilisateur
	async update(element: TypeUser): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	// supprime un type d'utilisateur
	async delete(element: TypeUser): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(element)) == undefined;
		})
	}

}

export default TypeUserDAO;