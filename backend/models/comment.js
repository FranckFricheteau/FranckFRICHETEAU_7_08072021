// Création du modèle comment
const db = require('./db');
const Utils = require('../libs/utils.js');

const Comment = function(comment) {
    this.user_id = comment.user_id,
        this.message_id = message.user_id,
        this.comment = comment.comment,
        this.createdAt = comment.createdAt,
        this.updatedAt = comment.updatedAt

}

//créer un commentaire
Comment.create = (newComment, result) => {
    let statment = 'INSERT INTO comments SET ?';
    db.query(statment, newComment, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        return (null, res)
    })
};

//récupérer le dernier commentaire de l'utilisateur
Comment.latest = (result) => {
    let statment = 'SELECT comments.*, users.pseudo as pseudo FROM comments JOIN users ON users.id=comments.users.id ORDER BY id DESC LIMIT 0,1';
    db.query(statment, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        return (null, res[0])
    })
};

//récupérer tous les commentaires utilisateurs par message
Comment.findAllMessageComment = (id, result) => {
    let statment = 'SELECT * comments WHERE message.id=?';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        return (null, res[0])
    })
};

//supprimer un commentaire
Comment.delete = (id, result) => {
    let statment = 'SELECT * comments WHERE message.id=?';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        return (null, res)
    })
};

module.exports = Comment;