const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

// Inscription pour enregistrer des nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // On appelle la fonction de hachage, on créer un nouvel utilisateur, on le sauvegarde dans la BDD
        .then(hash => {
            const user = {
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                isActive: true,
                isAdmin: 0
            };
            console.log(user);
            Users.create(user)
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Création utilisateur, requête réussie et ressource créée code 201 OK
                .catch(error => res.status(400).send('Utilisateur déjà existant !')); // Erreur 400 Utilisateur déjà existant
        })
        .catch(error => res.status(500).json({ error: 'le serveur a rencontré un problème inattendu empêchant de répondre à la requête' }));
};

// Connexion
// controller de connexion à un compte existant
exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        if (!result.isActive) {
            return res.status(400).json({ message: 'Utlisateur trouvé mais désactivé' });
        }
        bcrypt.compare(req.body.password, result.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe invalide' })
                } else {
                    let payload = {
                        'userId': result.id,
                        'isAdmin': !!result.isAdmin
                    };
                    let profile = result.profilPic;
                    if (!result.profilPic) {
                        profile = ''
                    }
                    res.status(200).json({
                        pseudo: result.pseudo,
                        userId: result.id,
                        profilPic: profile,
                        isAdmin: result.isAdmin,
                        isActive: result.isActive,
                        token: jwt.sign(
                            payload,
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({ error: "Erreur serveur" }));
    })
};


// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    Users.findAll((err, result) => {
        if (err) {
            return res.status(404).send({ message: 'Utilisateurs non trouvés' });
        } else {
            res.status(200).json(result)
        }
    })
};

// Réupérer un seul user
exports.getOneUser = (req, res, next) => {
    let id = req.body.userId
    Users.findOneById(id, (err, result) => {
        if (err) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        } else {
            res.status(200).json(result)
        }
    })
};

// Mofifier un pseudo
exports.updateOneUserPseudo = (req, res, next) => {
    let myToken = Utils.getReqToken(req);
    // check pas d'usurpation de user_id
    if ((!myToken.isAdmin) && (myToken.userId != req.params.id)) {
        return res.status(401).send({ message: 'Non authorisé' });
    }
    let user = {
        'id': req.params.id,
        'pseudo': req.body.pseudo,
    }
    Users.modifyPseudo(user, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Modification non effectuée' });
        }
        res.status(201).json({
            pseudo: result.pseudo
        })
    })
};

// Mofifier une profilPic
exports.updateOneUserFile = (req, res, next) => {
    let myToken = Utils.getReqToken(req);
    // check pas d'usurpation de user_id
    if ((!myToken.isAdmin) && (myToken.userId != req.params.id)) {
        return res.status(401).send({ message: 'Non authorisé' });
    }

    let user = {
        'id': req.params.id,
        'profilPic': req.file ? req.file.filename : null,
    }
    Users.modifyProfilPic(user, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'BACK Modification non effectuée' });
        }
        res.status(201).json({
            profilPic: req.file.filename,
        });
    });
};

// Supprimer un user
exports.deactivateUser = (req, res, next) => {
    Users.deactivate(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Impossible de supprimer l\'utilisateur' });
        }
        res.status(204).json({
            message: 'Utilisateur correctement supprimé'
        })
    })
};