const express = require('express'); // Importation du framework Express
const router = express.Router(); // Méthode router() d'express
const auth = require('../middleware/auth'); // Importation du middleware d'authentification
const multer = require('../middleware/multer_config'); // Importation du middleware multer pour les images
const admin = require('../middleware/admin_control'); // Importation du middleware admin pour la suppr des messages
const messageCtrl = require('../controllers/messages'); // Importation du controlleur Message

// CRUD
router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.getAllMessages);
router.get('/reactions', auth, messageCtrl.getAllReactions);
router.post('/:id/reactions', auth, messageCtrl.createReaction);
router.delete('/:id', auth, admin, messageCtrl.deleteMessage);

module.exports = router;