const express = require('express');
const router = express.Router();

//Importer multer
const multer = require('../middleware/multer_config');

//Importation du controllers user
const userCtrl = require('../controllers/user');

const admin = require('../middleware/admin_control');

//Importation de la route GET pour afficher tous les utilisateurs
router.get('users', userCtrl.getAllUsers);

//Importation de la route GET pour afficher un utilisateur
router.get('/profile/:id', userCtrl.getOneUser);

//Route PUT pour modifier un utlisateur
router.put('/profile/:id,', userCtrl.updateOneUserPseudo);

//Route POST pour modifier la photo de profil d'un utilisateur
router.post('/profilPic/:id', multer, userCtrl.updateOneUserFile);

//Route DELETE pour supprimer un utilisateur
router.delete('/users/:id', admin, userCtrl.deactivateUser);

module.exports = router;