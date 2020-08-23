import DAO from "../dao.model";
import Category from "../Entities/category.entity";

abstract class 	CategoryDAOImpl implements DAO<Category> {
	
	abstract create(element: Category): boolean | Promise<boolean>;
	abstract find(id: number): Category | Promise<Category>;
	abstract findByName(name: string): Category | Promise<Category>;
	abstract findAll(): Category[] | Promise<Category[]>;
	abstract update(element: Category): boolean | Promise<boolean>;
	abstract delete(element: Category): boolean | Promise<boolean>;

}

export default CategoryDAOImpl;