import UserDAOImpl from "../../daoimpl/userdaoimpl.model";

import User from "../../Entities/user.entity";
import TypeUser from "../../Entities/typeuser.entity";

import {typeuserdao, Status} from "../../../util";


class UserDAO implements UserDAOImpl {
	private connect;	

	constructor(connexion){
		this.connect = connexion;
	}

	// crée un utilisateur
	async create(user: User, status?:Status): Promise<boolean>{
		
		if(status){

			let typeuser: TypeUser = new TypeUser();

			switch (status) {
				case Status.Admin:
					typeuser = await typeuserdao.findByName("admin");
					break;

				case Status.Caisse:
					typeuser = await typeuserdao.findByName("caisse");
					break;

				case Status.Client:
					typeuser = await typeuserdao.findByName("client");
					break;
			}

			user.status = typeuser;

		}

		return this.connect.then(async connection =>{
			return (await connection.manager.save(user)) == undefined;
		})
	}

	// trouve un utilisateur à partir de son id
	async find(id: number): Promise<User>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(User, { relations: ["status"] ,where: {id: id}});
		})
	}

	// trouve un utilisateur à partir de sn numéro de téléphone
	async findByPhone(phone: string): Promise<User>{
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(User, { relations: ["status"] ,where: {phone: phone}});
		})
	}

	// trouve trouve tous les utilisateurs d'un type (status) particulier
	async findAllWithStatus(status: Status): Promise<User[]>{

		let typeuser: TypeUser;

		switch (status) {
			case "admin":
				typeuser = await typeuserdao.findByName("admin");
				break;

			case "caisse":
				typeuser = await typeuserdao.findByName("caisse");
				break;

			case "client":
				typeuser = await typeuserdao.findByName("client");
				break;
		}

		return this.connect.then(async connection =>{
			return await connection.manager.find(User, { relations: ["status"], where: {"status": typeuser}});
		})
	}

	// met à jour un utilisateur
	async update(element: User): Promise<boolean>{
		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	// supprime un utilisateur
	async delete(element: User): Promise<boolean>{
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(element)) == undefined;
		})
	}

}

export default UserDAO;