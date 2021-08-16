// Création des modèles User
const db = require('./db');
const Utils = require('../libs/utils');

const User = function(User) {
    this.pseudo = User.pseudo,
        this.email = User.email,
        this.password = User.password,
        this.profilPic = User.profilPic,
        this.isAdmin = !!User.isAdmin,
        this.isActive = !!User.isActive



    // Création d'un user
    User.create = (newUser, result) => {
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
    User.findOne = (email, result) => {
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
    User.findOneById = (id, result) => {
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
    User.findAll = (result) => {
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
    User.modifyPseudo = (user, result) => {
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
    User.modifyProfilPic = (user, result) => {
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
    User.deactivate = (id, result) => {
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
module.exports = User;