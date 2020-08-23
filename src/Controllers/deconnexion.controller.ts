import * as express from 'express';

import {deconnexion} from "../util";



class DeconnexionController{

  public path = '/deconnexion';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

  	this.router.get('/', deconnexion);

  }
}

export default DeconnexionController;