import DAO from "./dao.model";
import TypeUserDAOImpl from "./daoimpl/typeuserdaoimpl.model";
import UserDAOImpl from "./daoimpl/userdaoimpl.model";
import CategoryDAOImpl from "./daoimpl/categorydaoimpl.model";
import CommandeDAOImpl from "./daoimpl/commandedaoimpl.model";
import CommandeItemDAOImpl from "./daoimpl/commandeitemdaoimpl.model";
import ItemDAOImpl from "./daoimpl/itemdaoimpl.model";
import ParameterDAOImpl from "./daoimpl/parameterdaoimpl.model";



interface FactoryImpl {

	getUserDAO():UserDAOImpl;
	getCategoryDAO():CategoryDAOImpl;
	getCommandeDAO():CommandeDAOImpl;
	getCommandeItemDAO():CommandeItemDAOImpl;
	getItemDAO():ItemDAOImpl;
	getTypeUserDAO():TypeUserDAOImpl;
	getParameterDAO():ParameterDAOImpl;
}

export default FactoryImpl;