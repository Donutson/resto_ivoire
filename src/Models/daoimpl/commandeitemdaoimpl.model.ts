import DAO from "../dao.model";
import CommandeItem from "../Entities/commandeitem.entity";

abstract class 	CommandeItemDAOImpl implements DAO<CommandeItem> {
	
	abstract create(element: CommandeItem): boolean | Promise<boolean>;
	abstract find(id: number): CommandeItem | Promise<CommandeItem>;
	abstract findAll(commandeid: number): CommandeItem[] | Promise<CommandeItem[]>;
	abstract update(element: CommandeItem): boolean | Promise<boolean>;
	abstract delete(element: CommandeItem): boolean | Promise<boolean>;

}

export default CommandeItemDAOImpl;