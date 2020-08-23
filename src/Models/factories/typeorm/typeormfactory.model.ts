import FactoryImpl from "../../factoryimpl.model";
import Connexion from "../../connexion.model";
import UserDAO from "./userdao.model";
import CategoryDAO from "./categorydao.model";
import CommandeDAO from "./commandedao.model";
import CommandeItemDAO from "./commandeitemdao.model";
import ItemDAO from "./itemdao.model";
import TypeUserDAO from "./typeuserdao.model";
import ParameterDAO from "./parameterdao.model";



class TypeORMFactory implements FactoryImpl{
	private static connexion;

	constructor(){
		this.setConnection();
		
	}

	getUserDAO(): UserDAO{

		return new UserDAO(TypeORMFactory.connexion);
	}

	getCategoryDAO(): CategoryDAO{
		return new CategoryDAO(TypeORMFactory.connexion);
	}

	getCommandeDAO(): CommandeDAO{
		return new CommandeDAO(TypeORMFactory.connexion);
	}

	getCommandeItemDAO(): CommandeItemDAO{
		return new CommandeItemDAO(TypeORMFactory.connexion);
	}

	getItemDAO(): ItemDAO{
		return new ItemDAO(TypeORMFactory.connexion);
	}

	getTypeUserDAO(): TypeUserDAO{

		return new TypeUserDAO(TypeORMFactory.connexion);
	}

	getParameterDAO(): ParameterDAO{

		return new ParameterDAO(TypeORMFactory.connexion);
	}

	private async setConnection(){
		TypeORMFactory.connexion =  Connexion.getConnexion();
	}
}

export default TypeORMFactory;