import * as express from 'express';

import User from "../Models/Entities/user.entity";
import TypeUser from "../Models/Entities/typeuser.entity";
import Parameter from "../Models/Entities/parameter.entity";

import {userdao, typeuserdao, parameterdao, Status} from "../util";



class DbController{

  public path = '/db';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.get('/', this.getAccueil);
    this.router.get('/init', this.getInit);
  }

  private async getAccueil(req: express.Request, res: express.Response){

    // création des différents utilisateurs
    let typeuser = new TypeUser();


    typeuser = new TypeUser();
    typeuser.name = "admin";
    await typeuserdao.create(typeuser);

    typeuser = new TypeUser();
    typeuser.name = "caisse";
    await typeuserdao.create(typeuser);

    typeuser = new TypeUser();
    typeuser.name = "client";
    await typeuserdao.create(typeuser);
    
    res.redirect("/accueil");

  }

  private async getInit(req: express.Request, res: express.Response){

    // création de l'admin
    const user = new User();

    user.name = "admin";
    user.lastname = "admin";
    user.email = "admin@gmail.com";
    user.password = "admin";
    user.phone = "20345180";
    user.photo = "admin.png";
    await userdao.create(user, Status.Admin);

    // création des paramètres par défaut
    const parameter = new Parameter();
    parameter.colorCategoryBox = "#EED5D2";
    parameter.colorCategory = "#CDB7B5";
    parameter.colorCategoryText = "#EED5D2";
    parameter.colorItem = "#EEE0E5";
    parameter.priceUnit = "$";
    await parameterdao.create(parameter);

    res.redirect("/accueil");
  }
 
}

export default DbController;