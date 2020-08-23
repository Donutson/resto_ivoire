import DAO from "../dao.model";
import Parameter from "../Entities/parameter.entity";

abstract class 	ParameterDAOImpl implements DAO<Parameter> {
	
	abstract create(element: Parameter): boolean | Promise<boolean>;
	abstract find(id: number): Parameter | Promise<Parameter>;
	abstract update(element: Parameter): boolean | Promise<boolean>;
	abstract delete(element: Parameter): boolean | Promise<boolean>;

}

export default ParameterDAOImpl;