import TypeORMFactory from "./factories/typeorm/typeormfactory.model";
import DAO from "./dao.model";
import FactoryImpl from "./factoryimpl.model";

abstract class Factory {
	public static TYPEORMFACTORY = 0;

	static getFactory(type: number): FactoryImpl{
		let factory;
		switch (type) {
			case Factory.TYPEORMFACTORY:
				factory = new TypeORMFactory();
				break;
			
		}
		return factory;
	}

}

export default Factory;