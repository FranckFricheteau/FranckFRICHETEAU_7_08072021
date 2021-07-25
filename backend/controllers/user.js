const bcrypt = require('bcrypt'); // Importation du package de chiffrement bcrytp
const jwt = require('jsonwebtoken'); // Importation du package jsonwebtoken. Il permet l'échange sécurisé de jetons (tokens) entre plusieurs parties
const User = require('../models/user'); // Importation modèle User
const fs = require('fs'); // Importation file system de node.js
const Utils = require('../libs/utils.js');

// Inscription pour enregistrer des nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // On appelle la fonction de hachage du mot passe avec 10 tours d'algorithmes de hachage
        .then(hash => {
            const User = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                isActive: true,
            });
            User.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Création utilisateur, requête réussie et ressource créée code 201 OK
                .catch(error => res.status(400).send('Utilisateur déjà existant !')); // Erreur 400 Utilisateur déjà existant

        })

    .catch(error => res.status(500).json({ error: 'le serveur a rencontré un problème inattendu empêchant de répondre à la requête' }));
};

// Connexion
exports.login = (req, res, next) => {
    User.findOneByEmail(req.body.email, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Utilisateur non trouvé' }); //Erreur utilisateur introuvable code 400
        }

        if (!result.isActive) {
            return res.status(400).send({ message: 'Utlisateur trouvé mais désactivé' }); //Erreur utilisateur désactivé
        }

        bcrypt.compare(req.body.password, result.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).send({ message: 'Mot de passe invalide, veuillez réessayer s\'il vous plaît' }) //Erreur mot de passe invalide code 400
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
                            `${process.env.JWT_KEY}`, { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({ error: "Erreur serveur" }));
    })
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.findAll((err, result) => {
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
    User.findOneById(id, (err, result) => {
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
    User.modifyPseudo(user, (err, result) => {
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
    User.modifyProfilPic(user, (err, result) => {
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
    User.deactivate(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Impossible de supprimer l\'utilisateur' });
        }
        res.status(204).json({
            message: 'Utilisateur correctement supprimé'
        })
    })
};