const express = require('express');
const router = express.Router();

//Importer le Middleware de securité auth
const auth = require('../middleware/auth')
    //Importer multer
const multer = require('../middleware/multer_config');

//Importation du controllers user
const userCtrl = require('../controllers/user');

const admin = require('../middleware/admin_control');

//importation du middleware passwordValidator
const passwordValidator = require('../middleware/passwordValidator');

//importation des routes POST signup & login
//router.post('/signup', passwordValidator, userCtrl.signup); //Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
//router.post('/login', userCtrl.login); //Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé(contenant également l'identifiant userID)

//Importation de la route GET pour afficher tous les utilisateurs
//router.get('users', userCtrl.getAllUsers);

//Importation de la route GET pour afficher un utilisateur
//router.get('/profile/:id', auth, userCtrl.getOneUsers);

//Route PUT pour modifier un utlisateur
//router.put('/profile/:id,', auth, userCtrl.updateOneUserPseudo);

//Route POST pour modifier un utilisateur
//router.post('/profilPic/:id', auth, multer, userCtrl.updateOneUserFile);

//Route DELETE pour supprimer un utilisateur
//router.delete('/users/:id', auth, admin, userCtrl.deactivateUser);

module.exports = router;