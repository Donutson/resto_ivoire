import DAO from "../dao.model";
import User from "../Entities/user.entity";
import {Status} from "../../util";

abstract class UserDAOImpl implements DAO<User> {
	
	abstract create(element: User, status?:Status): boolean | Promise<boolean>;
	abstract find(id: number): User | Promise<User>;
	abstract findByPhone(phone: string): User | Promise<User>;
	abstract findAllWithStatus(status: Status): User[] | Promise<User[]>;
	abstract update(element: User): boolean | Promise<boolean>;
	abstract delete(element: User): boolean | Promise<boolean>;

}

export default UserDAOImpl;