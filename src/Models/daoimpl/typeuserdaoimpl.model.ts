import DAO from "../dao.model";
import TypeUser from "../Entities/typeuser.entity";

abstract class TypeUserDAOImpl implements DAO<TypeUser> {
	
	abstract create(element: TypeUser): boolean | Promise<boolean>;
	abstract find(id: number): TypeUser | Promise<TypeUser>;
	abstract update(element: TypeUser): boolean | Promise<boolean>;
	abstract delete(element: TypeUser): boolean | Promise<boolean>;
	abstract findByName(name: string): TypeUser | Promise<TypeUser>;

}

export default TypeUserDAOImpl;