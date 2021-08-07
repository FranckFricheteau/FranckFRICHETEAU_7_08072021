// Création des modèles User
var mysql = require('mysql');
const db = require('./db');
const Utils = require('../libs/utils');

const User = function(user) {
    this.pseudo = user.pseudo,
        this.email = user.email,
        this.password = user.password,
        this.profilPic = user.profilPic,
        this.isAdmin = !!user.isAdmin,
        this.isActive = !!user.isActive
}



// Création d'un user
User.create = (newUser, result) => {
    let statment = 'INSERT INTO users SET ?';
    User.create = (statment, newUser, (err, res) => {
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
User.findOneByEmail = (email, result) => {
    let statment = 'SELECT * FROM users WHERE email=? AND isActive=true';
    User.findOneByEmail = (statment, email, (err, res) => {
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
    User.findOneById = (statment, id, (err, res) => {
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
    User.findAll = (statment, (err, res) => {
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
    User.modifyPseudo = (statment, user, (err, res) => {
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
    User.modifyProfilPic = (statment, user, (err, res) => {
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
    User.deactivate = (statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = User;