const express = require('express');
const app = express();
const path = require("path")
const bodyParser = require('body-parser');
const auth = require("./middleware/auth")

// recuperation de Helmet (sécurise les appli Express en définissant divers en-têtes HTTPP, protège contre les failles XSS//
const helmet = require('helmet');
const cors = require('cors');

//Rate Limit - Middleware de base à limitation de débit pour Express
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 60 // 60 essais max
});

//Limiter les demandes répétées à l'API uniquement sur le login
app.use("/api/auth/login", apiLimiter);


//import des routeurs dans l'application
const authRoutes = require("./routes/auth") // Importation de la route auth
const userRoutes = require("./routes/user") // Importation de la route user
const messageRoutes = require("./routes/messages") // Importation de la route messages
const commentRoutes = require("./routes/comments") // Importation de la route comments


//DB connection//
require("./models/db");

//CORS - Cross Origin Ressources Sharing - Partage des ressources entre origines multiples - Ajout d'entêtes HTTP pour accéder aux ressources d'un serveur situées sur une autre origine que le site courant provenant d'un domaine, port et protocole différent
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* .json - méthode de l'objet bodyParser qui transforme le corps de la requête en objet JS*/
app.use(bodyParser.json());

//Installation d'helmet, entête HTTP helmet
app.use(helmet());
//Installation de CORS - Utilisation de CORS
app.use(cors());

//Installation d'express - Utiliser l'application Express
app.use(express.json());

//gestionnaire de routage pour les images
//__dirname: le dossier où l'on se trouve
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes
app.use("/api/auth", authRoutes) //// L'application utilise le endpoint /api/auth pour la route authRoutes
app.use("/api/users", auth, userRoutes) // L'application utilise le endpoint /api/users pour la route  userRoutes
app.use("/api/messages", auth, messageRoutes) // L'application utilise le endpoint /api/messages pour la route  messageRoutes
app.use("/api/comments", auth, commentRoutes) // L'application utilise le endpoint /api/comments pour la route  commentRoutes

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app