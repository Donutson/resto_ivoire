interface DAO<T> {
	
	create(element: T): boolean | Promise<boolean>;
	find(id: number): T | Promise<T>;
	update(element: T): boolean | Promise<boolean>;
	delete(element: T): boolean | Promise<boolean>;

}

export default DAO;