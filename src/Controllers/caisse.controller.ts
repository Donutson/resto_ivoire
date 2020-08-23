import * as express from 'express';

import {

  links,
  Status,
  getAccess,
  getConnectAccess,
  commandedao,
  commandeitemdao,
  itemdao,
  CommandeAttr,
  panier,

} from "../util";


import Commande from "../Models/Entities/commande.entity";
import CommandeItem from "../Models/Entities/commandeitem.entity";
import User from "../Models/Entities/user.entity";



class CaisseController{

  public path = '/caisse';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.use(getConnectAccess);
    this.router.use(getAccess(Status.Caisse));


    this.router.get('/', this.getAccueil);

    this.router.get('/see/:commande_id', this.getSee);

    this.router.get('/changestat/:rtc', this.getChangeStat);

    this.router.get('/:actions/:commande_id', this.getActions);

  }


  private async getAccueil(req: express.Request, res: express.Response){

      const commande = {

        wait: await commandedao.findNull(CommandeAttr.Take),
        take: await commandedao.findNull(CommandeAttr.Achieve),
        ready: await commandedao.findNull(CommandeAttr.Send)

      }


      const rtc = {

        wait: req.session.rtcWait,
        take: req.session.rtcTake,
        ready: req.session.rtcReady

      }

      const params = {

        commande: commande,
        photo: req.session.photo,
        rtc: rtc // reception en temps réel

      }


      res.render('caisse', {links: links, params: params});

  }


  private async getActions(req: express.Request, res: express.Response){

    const commande_id = Number(req.params["commande_id"]);
    const action = req.params.actions.toLowerCase();
    const commande: Commande = await commandedao.find(commande_id);

    //commande_id est un nombre et correspond à l'id d'une commande existante
    if( ( !Number.isNaN(commande_id) ) && commande ){

      const user: User = req.session.user;

      switch(action){

        case "take":

          commande.dateTake = new Date();
          commande.taker = user;
          await commandedao.update(commande);
          break;

        case "cancel":

          // suppression de la commande
          await commandedao.delete(commande);
          break;

        case "ready":

          commande.dateAchieve = new Date();
          commande.achiever = user;
          await commandedao.update(commande);
          break;

        case "send":

          commande.dateSender = new Date();
          commande.sender = user;
          await commandedao.update(commande);
          break;

      }

    }

    res.redirect("/caisse");

  }


  private async getSee(req: express.Request, res: express.Response){

    const commande_id = Number(req.params["commande_id"]);
    
    links.css = "/css/";
    links.images = "/images/";
    links.js = "/js/";
    

    //commande_id est un nombre et correspond à l'id d'une commande existante
    if( !Number.isNaN(commande_id) && ( await commandedao.find(commande_id) ) ){

      const commandeitem: CommandeItem[] = await commandeitemdao.findAll( commande_id);

      // récuperation dans le panier des items associés à la commande
      for(let i=0; i<commandeitem.length; i++){

        const id = commandeitem[i].itemId;
        panier.items[id] = await itemdao.find(id);
        panier.quantities[id] = commandeitem[i].quantity;

       }

      res.render("see", {links: links, panier: panier});

    }else{

      res.redirect("/caisse");

    }

  }

  // déactivation/activation d'une reception en temps réel
  private getChangeStat(req: express.Request, res: express.Response){

    const rtc = req.params["rtc"].toLowerCase();

    switch (rtc) {

      case "wait":

        if(req.session.rtcWait)
          req.session.rtcWait = false;
        else
          req.session.rtcWait = true;
        break;

      case "take":

        if(req.session.rtcTake)
          req.session.rtcTake = false;
        else
          req.session.rtcTake = true;
        break;

       case "ready":

        if(req.session.rtcReady)
          req.session.rtcReady = false;
        else
          req.session.rtcReady = true;
        break;
    }

    res.redirect("/caisse");
  }
 
}

export default CaisseController;