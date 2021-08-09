// Création des modèles User
var mysql = require('mysql');
const db = require('./db');
const Utils = require('../libs/utils');

const Users = function(user) {
    this.pseudo = user.pseudo,
        this.email = user.email,
        this.password = user.password,
        this.profilPic = user.profilPic,
        this.isAdmin = !!user.isAdmin,
        this.isActive = !!user.isActive



    // Création d'un user
    Users.create = (newUser, result) => {
        let statment = 'INSERT INTO users SET ?';
        db.query(statment, newUser, (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {
                    id: res.id,
                    ...newUser
                })
            }
        })
    };

    // Trouver un user via son email
    Users.findOne = (email, result) => {
        let statment = 'SELECT * FROM users WHERE email=? AND isActive=true';
        db.query(statment, email, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0])
        })
    };

    // Trouver un user via son id
    Users.findOneById = (id, result) => {
        let statment = 'SELECT * FROM users WHERE id=? AND isActive=true';
        db.query(statment, id, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0])
        })
    };

    // Trouver tous les users dans la BDD
    Users.findAll = (result) => {
        let statment = 'SELECT * FROM users WHERE isActive=true';
        db.query(statment, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res)
        })
    };

    // Modifier le pseudo d'un user
    Users.modifyPseudo = (user, result) => {
        let statment = 'UPDATE users SET pseudo=? WHERE id=? AND isActive=true';
        db.query(statment, user, (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res)
            }
        })
    };

    // Modifier la photo de profil d'un user
    Users.modifyProfilPic = (user, result) => {
        let statment = 'UPDATE users SET profilPic=? WHERE id=? AND isActive=true';
        db.query(statment, user, (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res)
            }
        })
    };

    // Supprimer un user
    Users.deactivate = (id, result) => {
        let statment = 'UPDATE users SET isActive=false WHERE id=?';
        db.query(statment, id, (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, res)
            }
        })
    };

}
module.exports = Users;