import express from "express";

import* as path from "path";

import Factory from "./Models/factory.model";

import Item from "./Models/Entities/item.entity";
import User from "./Models/Entities/user.entity";

import FileUpload from "./Models/fileupload.model";



/**
*Fileupload
*/

export const samefilename = (req, file, cb)=>{
	//le fichier garde son nom d'origine
	cb(null, file.originalname);
}

//pour donner un nom precis
export const fixename = (name)=>{
	return (req, file, cb)=>{
				cb(null, name);
			}
}

//n'accepte que les images
export const onlypicture = (file, cb)=>{
	
	//les formats d'image acceptable
	const filetype = /jpeg|jpg|png|gif/;

	//on verifie que le fichier a la bnne extension
	const extname = filetype.test(path.extname(file.originalname).toLowerCase());

	//vérification du mime égalemment
	const mimetype = /image\/(jpeg|jpg|png|gif)/.test(file.mimetype);

	if(mimetype && extname){
		return cb(null, true);
	}else{
		cb("Uniquement que des images au format jpeg/jpg, png et gif");
	}
}


/**
*	Static
*/

// liens vers les dossiers des fichiers statiques
export let links = {
        images: "../images/",
        css: "../css/",
        js: "../js/"
      };

/**
*Dao
*/
export const typeormfactory = Factory.getFactory(Factory.TYPEORMFACTORY);
export const categorydao = typeormfactory.getCategoryDAO();
export const userdao = typeormfactory.getUserDAO();
export const itemdao = typeormfactory.getItemDAO();
export const commandedao = typeormfactory.getCommandeDAO();
export const typeuserdao = typeormfactory.getTypeUserDAO();
export const commandeitemdao = typeormfactory.getCommandeItemDAO();
export const parameterdao = typeormfactory.getParameterDAO();


/**
*Admin
*/
export let visible = {
        general: true,
        caisse: false
      }


/**
*Connexion , entité et database
*/

export enum Status{
	
	Admin="admin",
	Caisse="caisse",
	Client="client"

}

export enum Entity{
	User,
	Item
}

// permet de créer un client ou un caissier
const createUser = async (req: express.Request, res: express.Response, status: Status)=>{

	const user = new User();
	user.name = req.body.nom;
	user.lastname = req.body.prenom;
	user.email = req.body.mail;
	user.phone = req.body.phone;
	user.password = req.body.password;
	user.photo = req.file.filename;

	await userdao.create(user, status);

	switch(status){
		case Status.Caisse:
			res.redirect('/admin/caisse');
			break;

		case Status.Client:
			res.redirect('/accueil');
			break;
	}

}

const createItem = async (req: express.Request, res: express.Response, id: number)=>{
	
	const item = new Item();
	item.name = req.body.nom;
	item.price = req.body.price;
	item.category = await categorydao.find(id);
	item.image = req.file.filename;

	await itemdao.create(item);

	res.redirect("/accueil/"+id);
}

// permet de créer une entité, ne crée que les entité user et item pour l'instant
export const createEntity = (req: express.Request, 
	res: express.Response, 
	entity: Entity, 
	status?: Status, 
	id?: number)=>{

	switch (entity) {
		case Entity.User:
			createUser(req, res, status);
			break;
		
		case Entity.Item:
			createItem(req, res, id);
			break;
	}
}

//charge les paramètres du site
export const makeParameter = async (req: express.Request)=>{
	if(!req.session.parameter)
		req.session.parameter = await parameterdao.find(1);
}

//autorise l'accès qu'à l'admin
const getAdminAccess = (req: express.Request, res: express.Response, next)=>{
	if(req.session.isAdmin){
		next();
	}else{
		res.redirect("/accueil"); 
	}
}
//autorise l'accès qu'au personnel de caisse
const getCaisseAccess = (req: express.Request, res: express.Response, next)=>{
	if(req.session.isCaisse){
		next();
	}else{
		res.redirect("/accueil"); 
	}
}

//autorise l'accès qu'aux clients
const getClientAccess = (req: express.Request, res: express.Response, next)=>{
	if(req.session.isClient){
		next();
	}else{
		res.redirect("/accueil"); 
	}
}

//autorise l'accès qu'aux personnes déconnectées
export const getDisconnectAccess = async (req: express.Request, res: express.Response, next)=>{
	if( !req.session.isConnected ){
		await makeParameter(req);
		next();
	}else{
		res.redirect("/accueil"); 
	}
}

//autorise l'accès qu'aux personnes connectées
export const getConnectAccess = (req: express.Request, res: express.Response, next)=>{
	if( req.session.isConnected ){
		next();
	}else{
		res.redirect("/accueil"); 
	}
}

//gère les différents accès
export const getAccess = (status: Status)=>{

	switch(status){
		case Status.Admin:
			return getAdminAccess;
			break;

		case Status.Caisse:
			return getCaisseAccess;
			break;

		case Status.Client:
			return getClientAccess;
			break;
	}
}

//déconnecte l'utilisateur en supprimant sa session en cours
export const deconnexion = (req: express.Request, res: express.Response)=>{

	req.session.destroy();
      
    res.redirect('/accueil');
}

//pour enregistrer un utilisateur au travers d'un formulaire
export const insertUser = (status:Status)=>{

	const redirect = async (req: express.Request, res: express.Response, phoneerror?: string, imageerror?: string, user?: User) =>{
	
		let params;
		let links = {
        images: "../../images/",
        css: "../../css/",
        js: "../../js/"
      };
		
		switch(status){

		    case Status.Caisse:

		      visible.caisse = true;
		      visible.general = false;

		      const cashiers: User[] = await userdao.findAllWithStatus(Status.Caisse);
		      
		       params = {
		        cashiers: cashiers,
		        visible: visible,
		        phoneerror: phoneerror,
		        imageerror: imageerror,
		        user: user
		      }
		      
		      res.render('admin', {links: links, params: params});
		      break;

		    case Status.Client:

		       params = {
		        phoneerror: phoneerror,
		        imageerror: imageerror,
		        user: user
		      }

		      res.render('inscription', {links: links, params});
		      break;
		 }
	}


	return async (req: express.Request, res: express.Response)=>{

		let error: boolean = false;
		let phoneerror: string;
		let folder: String;

		switch(status){

			case Status.Caisse:
		      folder = "caisses";
		      break;

		    case Status.Client:
		      folder = "clients";
		      break;

		  }

		const fileupload = new FileUpload("./front/public/images/"+folder,
	 	samefilename, "image", onlypicture);

		  const upload = fileupload.getUpload();

		  upload(req, res, async (err)=>{

		  	const phone = req.body.phone;

			if(err || (req.file == undefined)){

		      redirect(req, res, "", err);

		    }else{

		    	const user = new User();
				user.name = req.body.nom;
				user.lastname = req.body.prenom;
			    user.email = req.body.mail;
				user.phone = req.body.phone;
				user.photo = req.file.filename;

				console.log(phone, phone.length)
		    	if( (phone.length < 8) || Number.isNaN(phone) ){

			    	redirect(req, res, "Veuillez saisir un numéro avec au moins 8 chiffres", "", user);

				}else if(await userdao.find(phone)){

					redirect(req, res, "Ce numéro est déjà pris", "", user);

				}else{

					createEntity(req, res, Entity.User,status);

				}

		    }

		  });

	}

}


/**
*Compte
*/


export let panier = {
	quantities: {/*id_item:quantite*/},
	items: {/*id_item: item*/}
}


export const codeGenerator = ()=>{
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export enum CommandeAttr{
	Take = "dateTake",
	Achieve = "dateAchieve",
	Send = "dateSender"
}