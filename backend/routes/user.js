const express = require("express"); // Importation framework express
const router = express.Router(); // Création routeur avec la méthode router() d'express

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config'); // Importation du middleware multer pour les images
const admin = require('../middleware/admin_control')

//Importation du controllers user
const userCtrl = require('../controllers/user');

//importation du middleware passwordValidator
const passwordValidator = require('../middleware/passwordValidator');


//importation des routes signup & login
router.post('/signup', passwordValidator, userCtrl.signup); //Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
router.post('/login', userCtrl.login); //Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé(contenant également l'identifiant userID

// Route GET pour afficher tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);

// Route GET pour afficher un user
router.get('/profile/:id', auth, userCtrl.getOneUser);

// Route PUT pour modifier un user
router.put('/profile/:id', auth, userCtrl.updateOneUserPseudo);

// Route PUT pour modifier un user
router.post('/profilPic/:id', auth, multer, userCtrl.updateOneUserFile);

// Route DELETE pour supprimer un user
router.delete('/users/:id', auth, admin, userCtrl.deactivateUser);

module.exports = router;