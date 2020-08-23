import* as multer from "multer";


class FileUpload{

	private upload;
	private storage;

	constructor(dest: string, filename: Function, fieldname: string, filefilter?: Function){

		this.setStorage(dest, filename);
		this.setUpload(fieldname, filefilter);
	}

	private setStorage(dest: string, filename: Function){

		this.storage = multer.diskStorage({
							destination: dest,
							filename: function(req, file, cb){
								filename(req, file, cb);
							}
						})
	}

	private setUpload(fieldname: string, filefilter?: Function){

		this.upload = multer({
							storage: this.storage,
							fileFilter: function(req, file, cb){
								filefilter(file, cb);
							}
						}).single(fieldname);
	}

	public getUpload(){
		return this.upload;
	}

}

export default FileUpload;