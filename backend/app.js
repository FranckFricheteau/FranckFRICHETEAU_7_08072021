const express = require('express'); // Importation du framework : création et gestion du serveur
const bodyParser = require('body-parser'); // Importation du package body-parser : extraction des objets JSON
const path = require('path'); // Importation du package mongoose-path :
const helmet = require('helmet'); // Importation du package helmet :
const cors = require('cors');

//Rate Limit - Middleware de base à limitation de débit pour Express
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 60 // 60 essais max
});

//import des routeurs dans l'application
const messageRoutes = require("./routes/messages") // Importation de la route messages
const commentRoutes = require("./routes/comments") // Importation de la route comments
const authRoutes = require("./routes/auth") // Importation de la route auth
const userRoutes = require("./routes/user") // Importation de la route user


const app = express(); // Application


//DB connection//
require("./models/db");

//CORS - Cross Origin Ressources Sharing - Partage des ressources entre origines multiples - Ajout d'entêtes HTTP pour accéder aux ressources d'un serveur situées sur une autre origine que le site courant provenant d'un domaine, port et protocole différent
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Limiter les demandes répétées à l'API uniquement sur le login
app.use("/api/auth/login", apiLimiter);
app.use(bodyParser.json()); // Définition de la fonction json comme middleware global
app.use(bodyParser.urlencoded({ extended: true })); // content-type: application/x-www-form-urlencoded
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Gestion de la source de manière statique grâce à Express
app.use(helmet());

//enregistrement des routes
app.use("/api/auth", authRoutes) //// L'application utilise le endpoint /api/auth pour la route authRoutes
app.use("/api/users", userRoutes) // L'application utilise le endpoint /api/users pour la route  userRoutes
app.use("/api/messages", messageRoutes) // L'application utilise le endpoint /api/messages pour la route  messageRoutes
app.use("/api/comments", commentRoutes) // L'application utilise le endpoint /api/comments pour la route  commentRoutes

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app