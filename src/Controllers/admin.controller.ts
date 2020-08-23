import * as express from 'express';

//Entities
import Category from "../Models/Entities/category.entity";
import Item from "../Models/Entities/item.entity";
import User from "../Models/Entities/user.entity";

//fileupload and utils
import FileUpload from "../Models/fileupload.model";
import { samefilename, 
  onlypicture, 
  fixename, 
  links, 
  categorydao, 
  itemdao, 
  userdao,
  parameterdao,
  Entity,
  createEntity, 
  getAccess,
  getConnectAccess,
  insertUser,
  Status, 
  visible } from "../util";


let categories: Category[];



class AdminController{

  public path = '/admin';
  public router = express.Router();

  constructor(){

    this.initializeRoutes();

  }
    
 
  initializeRoutes() {

    this.router.use(getConnectAccess);
    this.router.use(getAccess(Status.Admin));


    this.router.get('/', this.getAccueil);

    this.router.post('/category/make', this.postMakeCategory);
    this.router.post('/category/delete', this.postDelCategory);

    this.router.post('/item', this.postItem);
    this.router.post('/item/update', this.updateItem);
    this.router.post('/item/delete', this.deleteItem);

    this.router.post('/cover', this.postCover);

    this.router.get('/caisse', this.getCaisse);
    this.router.post('/caisse/create', insertUser(Status.Caisse));
    this.router.post('/caisse/delete', this.deleteCaisse);

    this.router.post('/parameters', this.postParameters);

  }


  private async getAccueil(req: express.Request, res: express.Response){

      categories = await categorydao.findAll();

      visible.caisse = false;
      visible.general = true;

      const params = {
        categories: categories,
        photo: req.session.photo,
        visible: visible
      }
      
      res.render('admin', {links: links, params: params});


  }

  private async postMakeCategory(req: express.Request, res: express.Response){
      
      const category = new Category();
      category.name = req.body.category;

      await categorydao.create(category);

      res.redirect("/admin");

  }


  private async postDelCategory(req: express.Request, res: express.Response){

    // suppression des catégories sélectionnnées
    for(let i=0;i<categories.length; i++){
      if(req.body[categories[i].name] == "on"){
        await categorydao.delete(categories[i]);
      }
    }

      res.redirect("/admin");

  }


  private postItem(req: express.Request, res: express.Response){
      
      let errormessage: string;

      const fileupload = new FileUpload("./front/public/images/items",
        samefilename, "image", onlypicture);

      const upload = fileupload.getUpload();

      upload(req, res, (err)=>{

        const id = req.body["categoryid"];

        if(err || (req.file == undefined)){

          errormessage = err;

        }else{

          createEntity(req, res, Entity.Item,undefined, id);

        }

      });

  }


  private async updateItem(req: express.Request, res: express.Response){

    let category: Category = await categorydao.findByName(req.body.category);

    //si la category n'existe pas, elle est créee
    if(!category){
      category = new Category();
      category.name = req.body.category;
      await categorydao.create(category);
      category = await categorydao.findByName(req.body.category);
    }

    const item = await itemdao.find(req.body.id);
    item.name = req.body.name;
    item.price = req.body.price;
    item.category = category;

    await itemdao.update(item);

    res.redirect("/accueil/"+category.id);

  }


  private async deleteItem(req: express.Request, res: express.Response){

      const item: Item = await itemdao.find(req.body.id);
      await itemdao.delete(item);

      res.redirect("/accueil/"+req.body.categoryid);

  }


  //pour changer l'image d'accueil
  private postCover(req: express.Request, res: express.Response){

      const fileupload = new FileUpload("./front/public/images",
        fixename("cover.jpg"), "image", onlypicture);

      const upload = fileupload.getUpload();

      upload(req, res, (err)=>{

        const id = req.body["categoryid"];

        if(err || (req.file == undefined)){

          console.log(err);

        }else{

          res.redirect("/accueil/"+id);

        }

      });

  }










  private async getCaisse(req: express.Request, res: express.Response){

      visible.caisse = true;
      visible.general = false;

      // récupération du personnel caissier
      const cashiers: User[] = await userdao.findAllWithStatus(Status.Caisse);
      
      const params = {
        cashiers: cashiers,
        photo: req.session.photo,
        visible: visible
      }
      
      res.render('admin', {links: links, params: params});

  }


  private async deleteCaisse(req: express.Request, res: express.Response){
      
      const cashier: User = await userdao.findByPhone(req.body.phone);
      await userdao.delete(cashier);
      
      res.redirect('/admin/caisse');

  }






  private async postParameters(req: express.Request, res: express.Response){

    const parameter = await parameterdao.find(1);

    parameter.colorCategoryBox = req.body.category_box;
    parameter.colorCategoryText = req.body.category_text;
    parameter.colorCategory = req.body.category_button;
    parameter.colorItem = req.body.item_box;
    parameter.priceUnit = req.body.price_unit;
    await parameterdao.update(parameter);

    req.session.parameter = parameter;

    res.redirect("/accueil");
  }
 
}

export default AdminController;
