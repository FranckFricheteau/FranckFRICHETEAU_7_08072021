const express = require('express'); //importation d'express
const router = express.Router(); //Importation du routeur d'express
const auth = require('../middleware/auth'); //importation middleware d'authentification
const commentControllers = require('../controllers/comments'); // Importation du controlleur Comments
const admin = require('../middleware/admin_control'); // Importation middleware admin pour la suppression des messages

router.post('/', auth, commentControllers.createComment);
router.get('/:id', auth, commentControllers.getAllMessageComment);
router.delete('/:id', auth, admin, commentControllers.deleteComment);

module.exports = router;