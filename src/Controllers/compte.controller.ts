import * as express from 'express';

import { links, 
  getAccess, 
  Status, 
  itemdao, 
  categorydao, 
  commandedao, 
  commandeitemdao,
  userdao,
  getDisconnectAccess, 
  getConnectAccess, 
  insertUser,
  codeGenerator,
  panier,
} from "../util";

import Commande from "../Models/Entities/commande.entity";
import CommandeItem from "../Models/Entities/commandeitem.entity";
import User from "../Models/Entities/user.entity";



class CompteController{

  public path = '/compte';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.get('/inscription',getDisconnectAccess, this.getInscription);
    this.router.post('/inscription',getDisconnectAccess, insertUser(Status.Client));

    this.router.get('/infos', getConnectAccess, this.getInfos);

    this.router.use(getConnectAccess);
    this.router.use(getAccess(Status.Client));

    
    this.router.get('/panier', this.getPanier);
    this.router.get('/panier/add/:category/:item_id', this.getPanierAdd);
    this.router.get('/panier/:option/:item_id', this.getPanierDel);

    this.router.get('/commande/:option', this.getCommande);

    this.router.post('/newpass', this.getChangePass);

  }

  private getPanier(req: express.Request, res: express.Response){ 

    const command = req.session.command || false;
    delete req.session.command;

    const commandinfos = req.session.commandinfos || {};
    delete req.session.commandinfos;

    const params ={
      panier: req.session.panier,
      command: command,
      commandinfos: commandinfos
    }

    res.render('panier', {links: links, params: params});

  }


  private getInscription(req: express.Request, res: express.Response){ 

     res.render('inscription', { links: links });

  }

  private async getPanierAdd(req: express.Request, res: express.Response){ 
    
    const category = Number(req.params.category.toLowerCase());
    const item_id = Number(req.params["item_id"].toLowerCase());

    //on verifie que la category et l'id sont des nombres
    // et qu'ils correspondent respectivement 
    //à des id de category et item existant
    if( ( !Number.isNaN(category) )
      && ( !Number.isNaN(item_id) )
      && ( await categorydao.find(category) )
      && ( await itemdao.find(item_id) )
      ){

      const item = await itemdao.find(item_id);

      // si l'id spéécifié est déjà l'id d'un article de la commande du client, alors on incremente sa quantité de 1
      // sinon on crée cet article dans le panier et on met sa quantité à 1
      if(item_id in req.session.panier.items){

        req.session.panier.quantities[item_id] += 1;

      }else{

        req.session.panier.quantities[item_id] = 1;
        req.session.panier.items[item_id] = item;

      }

      res.redirect("/accueil/"+category);
   
     }else{

       res.redirect("/accueil");

     }

  }


  private async getPanierDel(req: express.Request, res: express.Response){

    const option = req.params.option.toLowerCase();
    const item_id = Number(req.params["item_id"].toLowerCase());

    //on verifie que l'option est correcte
    //l'id est un nombre et qu'il correspondend à l'id d'un item existant
    if(( (option == "delall") || (option == "del") )
      && ( !Number.isNaN(item_id) )
      && ( await itemdao.find(item_id) )
      && ( item_id in req.session.panier.items )
      ){

      switch(option){

        case "del":

          // s'il qu'une seule quantité pour l'article, on la retire du panier
          // dans le cas contraire on reduit la quantité d'une unité
          if(req.session.panier.quantities[item_id] == 1){

            delete req.session.panier.quantities[item_id];
            delete req.session.panier.items[item_id];

          }else{

            req.session.panier.quantities[item_id] -= 1;

          }

          break;

        case "delall":

          delete req.session.panier.quantities[item_id];
          delete req.session.panier.items[item_id];
          break;

      }

      res.redirect("/compte/panier");    

    }else{

      res.redirect("/accueil");

    }

  }


  private async getCommande(req: express.Request, res: express.Response){

    const option = req.params.option.toLowerCase();

    if((option == "make") || (option == "cancel")){

      if(option == "make"){

        let commande: Commande = new Commande();

        const code: string = codeGenerator();
        const user: User = req.session.user;

        commande.user = user ;
        commande.codeCommande = code;

        await commandedao.create(commande);
        commande = await commandedao.findLast(user);


        req.session.commandinfos = {
          id: commande.id,
          code: commande.codeCommande
        }

        // association des items à la commande et enregistrement de la commande
        for(let id in req.session.panier.items){

          const  commandeitem: CommandeItem = new CommandeItem();

          commandeitem.commandeId = commande.id;
          commandeitem.itemId = req.session.panier.items[id].id;
          commandeitem.quantity = req.session.panier.quantities[id];

          await commandeitemdao.create(commandeitem);

        }

        req.session.command = true;

      }

      // réinitialisatiob du panier
      panier.quantities = {};
      panier.items = {};
      req.session.panier = panier;
      
      res.redirect("/compte/panier");

    }else{

      res.send("Url invalide");

    }

  }

  private getInfos(req: express.Request, res: express.Response){

      // message en relation avec le changement de mot de passe
      const passMessage = req.session.passMessage;
      delete req.session.passMessage;

      const params = {

        user: req.session.user,
        photo: req.session.photo,
        "isVisible": req.session.isClient,
        message: passMessage || ""

      };

      res.render("infos", {links, params: params});

  }


 private async getChangePass(req: express.Request, res: express.Response){

   //mot de passe actuel saisir par l'utilisateur
   const cur = req.body.current;

   let message = "le mot de passe a été changé"

   //on vérifie si s'agit bien et bel de son mot de passe actuel
   if (req.session.user.password == cur) {
     
     //on remplace le mot de passe actuel par le nouveau
     req.session.user.password = req.body.new;

     const user: User = new User();
     user.id = req.session.user.id;
     user.password = req.session.user.password;

     await userdao.update(user);


   }else{

     message = "le mot de passe ne correspond pas";

   }

   req.session.passMessage = message;
   res.redirect("/compte/infos");

 }
 
}

export default CompteController;
