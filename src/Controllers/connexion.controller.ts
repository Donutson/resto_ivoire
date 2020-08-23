import * as express from 'express';

import User from "../Models/Entities/user.entity";

import { links, 
  typeuserdao, 
  userdao,
  getDisconnectAccess, 
  panier 
} from "../util";



class ConnexionController{

  public path = '/connexion';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.use(getDisconnectAccess);
    

    this.router.get('/:status', this.getConnexion);
    this.router.post('/', this.postConnexion);

  }

  private getConnexion(req: express.Request, res: express.Response){

    let status = req.params["status"].toLowerCase();
    
    res.render('connexion', {links: links, status: status});

  }


  private async postConnexion(req: express.Request, res: express.Response){

    let user: User = new User();
    let status: string = req.body.typeuser.toLowerCase();

    user.phone = req.body.phone;
    user.password = req.body.pass;
    
    let user1: User = await userdao.findByPhone(user.phone);
    let statusid: number = (await typeuserdao.findByName(status)).id;
    let isvalid = true;

    // vérification des données saisies
    if((user1 == undefined) 
      || (user1 == null) 
      || (user1.password != user.password) 
      || (user1.status.id != statusid)
      ){

      isvalid = false;
    }else{
      user = user1;
    }
    
  
    if(isvalid){

      req.session.isConnected = true;
      req.session.user = user;
      switch (status) {
        case "admin":
          req.session.isAdmin = true;
          req.session.photo = "admin/"+user.photo;
          req.session.editable = true;
          res.redirect('/admin');
          break;
        case "client":
          req.session.isClient = true;
          req.session.panier = panier;
          req.session.photo = "clients/"+user.photo;
          res.redirect('/accueil');
          break;
        case "caisse":
          req.session.isCaisse = true;
          req.session.photo = "caisses/"+user.photo;

          req.session.rtcWait = true;
          req.session.rtcTake = true;
          req.session.rtcReady = true;
          res.redirect('/caisse');
          break;

      }
      
      
    }else{
      res.redirect("/connexion/"+status);
    }

  }

 
}

export default ConnexionController;
