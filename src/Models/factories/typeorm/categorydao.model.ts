import CategoryDAOImpl from "../../daoimpl/categorydaoimpl.model";
import Category from "../../Entities/category.entity";

class CategoryDAO implements CategoryDAOImpl {
	private connect;

	constructor(connexion){
		this.connect = connexion;
	}

	//crée une catégorie
	async create(element: Category): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	//trouve une categorie à partir de son identifiant id
	async find(id: number): Promise<Category>{
	
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Category, id);
		})
	}

	//trouve une categorie à partir de son nom
	async findByName(name: string): Promise<Category>{
	
		return this.connect.then(async connection =>{
			return await connection.manager.findOne(Category, { where: { name: name } } );
		})
	}

	//trouve toutes les catégories
	async findAll(): Promise<Category[]>{
	
		return this.connect.then(async connection =>{
			return await connection.manager.find(Category);
		})
	}

	//met à jour une catégorie
	async update(element: Category): Promise<boolean>{

		return this.connect.then(async connection =>{
			return (await connection.manager.save(element)) == undefined;
		})
	}

	//supprime ue catégorie
	async delete(element: Category): Promise<boolean>{
		
		return this.connect.then(async connection =>{
			return (await connection.manager.remove(element)) == undefined;
		})
	}

}

export default CategoryDAO;