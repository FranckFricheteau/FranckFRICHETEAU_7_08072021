const express = require('express'); //importation d'express
const router = express.Router(); //Importation du routeur d'express
const auth = require('../middleware/auth'); //importation middleware d'authentification
const commentCtrl = require('../controllers/comments'); // Importation du controlleur Comments
const admin = require('../middleware/admin_control'); // Importation middleware admin pour la suppression des messages

router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getAllMessageComment);
router.delete('/:id', auth, admin, commentCtrl.deleteComment);

module.exports = router;