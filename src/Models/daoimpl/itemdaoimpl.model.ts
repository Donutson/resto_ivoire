import DAO from "../dao.model";
import Item from "../Entities/item.entity";

abstract class 	ItemDAOImpl implements DAO<Item> {
	
	abstract create(element: Item): boolean | Promise<boolean>;
	abstract find(id: number): Item | Promise<Item>;
	abstract findForCategory(id: number): Item[] | Promise<Item[]>;
	abstract update(element: Item): boolean | Promise<boolean>;
	abstract delete(element: Item): boolean | Promise<boolean>;

}

export default ItemDAOImpl;