import * as express from 'express';

import Category from "../Models/Entities/category.entity";
import Item from "../Models/Entities/item.entity";

import  { links, categorydao, itemdao, makeParameter } from "../util";

let categories: Category[];



class AccueilController{

  public path = '/accueil';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.get('/', this.getAccueil);
    this.router.get('/:id', this.getAccueil);
    this.router.get('/:id/error', this.getAccueil);

  }


  private async getAccueil(req: express.Request, res: express.Response){
    
    await makeParameter(req);

    // récupération des id des catégories
    let categoriesIds = new Array();
    categories = await categorydao.findAll();
    categories.forEach((category)=>{
      categoriesIds.push(category.id);
    })

    // il existe au moins une catégorie
    if(categories.length != 0){

      //l'id de la catégorie
      let id = Number(req.params["id"]);

        
      // a-t-on reçu un nombre?
      if( Number.isNaN(Number(id)) ){

        id = categories[0].id;

      }
      
      //id correspond-t-il à un id de category
      if( ( id<0 ) || !(categoriesIds.includes(id)) ){

        id = categories[0].id;

      }

      // les items lié à la catégorie dont l'ientifiant est id
      let items: Item[] = await itemdao.findForCategory(id);
      
      let params = {
        "editable": req.session.editable,
        "categories": categories,
        "categoryname": (await categorydao.find(id)).name,
        "items": items,
        "id": id,
        "isConnected": req.session.isConnected,
        "isVisible": req.session.isClient,
        "photo": req.session.photo,
        "parameters": req.session.parameter
      };

      
      res.render('index', {links: links, params: params});
    }else{
      
      res.send("Page en construction");

    }
  }
 
}

export default AccueilController;