import * as  express from 'express';
import * as http from "http";
import * as Socket from "socket.io";
import * as bodyParser from 'body-parser';
import * as session from 'express-session'; 
import * as dotenv from 'dotenv';


dotenv.config();



class App {


  private app : express.Application;
  private server;
  private static io;
  private port: number;
  
  constructor(controllers, port){

    this.app = express();
    this.server = http.createServer(this.app);
    App.io = Socket(this.server);
    this.port = port || parseInt(process.env.PORT) || 5000;

    this.initializeSetting();
    this.initializeMiddlewares();
    this.initializeSocket();
    this.initializeControllers(controllers);
    
  }
  

  private initializeSetting(){

    this.app.set('views', './front/views');
    this.app.set('view engine', 'ejs');

   }


  private initializeMiddlewares() {

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended:false}));

    this.app.use(session({
      secret: 'dudfihrrqrqzrfhrargqzopr',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));

    this.app.use(express.static('./front/public'));
    
    
    this.app.set('json replacer', function (key, value) {

      if (this[key] instanceof Date) {
        // Your own custom date serialization
        value = this[key].toLocaleString();
      }
    
      return value;
    });

  }

 
  private initializeControllers(controllers) {

    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });

  }


  private initializeSocket(){

    App.io.on('connection', function(socket){

      // une nouvelle commande est passée
      socket.on("new commande", function(id, code){
        
        App.io.emit("new commande", id, code);

      });

      // une commande vient d'être prise
      socket.on("commande take", function(id, code){
        
        App.io.emit("commande take", id, code);

      });

      // une commande vient d'être achever
      socket.on("commande achieve", function(id, code){
        
        App.io.emit("commande achieve", id, code);

      });

      // une commande vient d'être livrer ou refuser
      socket.on("commande takeoff", function(id){
        
        App.io.emit("commande takeoff", id);

      });

    })

  }
 
  public listen() {
    this.server.listen(this.port, () => {

      console.log(`App listening on the port ${this.port}`);

    });

  }  
  
}

export default App;