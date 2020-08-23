import App from './app';

import AccueilController from "./Controllers/accueil.controller";
import AdminController from "./Controllers/admin.controller";
import CaisseController from "./Controllers/caisse.controller";
import CompteController from "./Controllers/compte.controller";
import DbController from "./Controllers/db.controller";
import ConnexionController from "./Controllers/connexion.controller";
import DeconnexionController from "./Controllers/deconnexion.controller";



const app = new App(

	[

		new AccueilController(),
		new AdminController(),
		new CaisseController(),
		new CompteController(),
		new DbController(), //pour initialiser la base de données
		new ConnexionController(),
		new DeconnexionController(),

	],

	5000
);

app.listen();
