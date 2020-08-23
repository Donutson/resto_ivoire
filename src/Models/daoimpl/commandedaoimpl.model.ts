import DAO from "../dao.model";

import Commande from "../Entities/commande.entity";
import User from "../Entities/user.entity";

import {CommandeAttr} from "../../util";



abstract class 	CommandeDAOImpl implements DAO<Commande> {
	
	abstract create(element: Commande): boolean | Promise<boolean>;
	abstract find(id: number): Commande | Promise<Commande>;
	abstract findLast(user: User): Commande | Promise<Commande>;
	abstract findNull(attr: CommandeAttr): Commande[] | Promise<Commande[]>;
	abstract update(element: Commande): boolean | Promise<boolean>;
	abstract delete(element: Commande): boolean | Promise<boolean>;

}

export default CommandeDAOImpl;