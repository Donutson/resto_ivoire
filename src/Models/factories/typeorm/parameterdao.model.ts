import ParameterDAOImpl from "../../daoimpl/parameterdaoimpl.model";
import Parameter from "../../Entities/parameter.entity";

class ParameterDAO implements ParameterDAOImpl {
	private connect;

	constructor(connexion){
		this.connect = connexion;
	}

	// crée des paramètres
	async create(element: Parameter): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	// trouve un paramétrage
	async find(id: number): Promise<Parameter>{
	
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Parameter, id);
		})
	}

	// met à jour un paramétrage
	async update(element: Parameter): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	// supprime un paramétrage
	async delete(element: Parameter): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(element)) == undefined;
		})
	}

}

export default ParameterDAO;