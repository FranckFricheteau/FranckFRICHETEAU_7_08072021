//framework standard pour le développement de serveur en Node.js
const express = require('express');

//Importation de mysql
var mysql = require('mysql');

//pour accéder au path de notre serveur
const path = require('path');

//Importation d'helmet, aide à sécuriser l'application Express, Middleware style Connect compatible avec le framework Express
const helmet = require("helmet");

//pour créer une application express
const app = express();

//Installation d'helmet, entête HTTP helmet
app.use(helmet());

//Rate Limit - Middleware de base à limitation de débit pour Express
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 30 // 15 essais max
});

//Importation de CORS
//const cors = require('cors');

//Limiter les demandes répétées à l'API uniquement sur le login
app.use("/api/auth/login", apiLimiter);

const messageRoutes = require("./routes/messages"); // Importation des routes messages
const commentRoutes = require("./routes/comments"); // Importation des routes comments
const userRoutes = require("./routes/user"); // Importation des routes user

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Azerty123,',
    database: 'groupomania',
});

//Connexion a mysql
connection.connect(function(error) {
    if (error) {
        console.log("connection to MySQL failed");
        throw error
    } else { console.log('All is under controle =) Success ! '); }
});


//CORS - Cross Origin Ressources Sharing - Partage des ressources entre origines multiples - Ajout d'entêtes HTTP pour accéder aux ressources d'un serveur situées sur une autre origine que le site courant provenant d'un domaine, port et protocole différent
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Installation d'express - Utiliser l'application Express
app.use(express.json());

//Installation de CORS - Utilisation de CORS
//app.use(cors());

//gestionnaire de routage pour les images
//__dirname: le dossier où l'on se trouve
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes
app.use("/api/messages", messageRoutes); // L'application utilise le endpoint /api/messages pour les routes messageRoutes
app.use("/api/comments", commentRoutes); // L'application utilise le endpoint /api/comments pour les routes commentRoutes
app.use("/api/auth", userRoutes); // L'application utilise le endpoint /api/auth pour les routes userRoutes

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app;