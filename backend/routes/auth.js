const express = require('express');
const router = express.Router();

//Importation du controllers user
const userCtrl = require('../controllers/user');

//importation du middleware passwordValidator
const passwordValidator = require('../middleware/passwordValidator');

//importation des routes signup & login
router.post('/signup', passwordValidator, userCtrl.signup); //Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
router.post('/login', userCtrl.login); //Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé(contenant également l'identifiant userID

module.exports = router;