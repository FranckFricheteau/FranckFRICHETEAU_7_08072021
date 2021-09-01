// Création du modèle messages
const db = require('./db');

const Message = function(message) {
    this.user_id = message.user_id,
        this.content = message.content,
        this.image = message.image,
        this.createdAt = message.createdAt,
        this.updatedAt = message.updatedAt,
        this.isActive = !!message.isActive

}



//Créer un message
Message.create = (newMessage, result) => {
    let statment = 'INSERT INTO messages SET ?';
    db.query(statment, newMessage, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {
            id: res.id,
            ...newMessage
        })
    })
};

//trouver un message
Message.findOne = (id, result) => {
    let statment = 'SELECT * FROM messages WHERE id=? AND isActive=true';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res[0])

    })
};

//récupérer le dernier message
Message.getLatest = (id, result) => {
    let statment = 'SELECT * FROM messages WHERE isActive=true ORDER BY id DESC LIMIT 0,1';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res[0])

    })
};

//Trouver tous les messages
Message.findAll = (result) => {
    let statment = 'SELECT messages.*, users.pseudo, users.profilPic FROM messages JOIN users ON users.id = messages.user_id WHERE messages.isActive=true ORDER BY messages.id DESC';
    db.query(statment, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res)

    })
};

// Trouver tous les messages avec commentaires
Message.findAllWithComments = (result) => {
    db.query(`SELECT messages.*, 
              users.pseudo, users.profilPic, 
              comments.id AS comment_id, 
              user_comment.pseudo AS comment_pseudo, 
              comments.comment AS comment_content
              FROM messages 
              LEFT JOIN users ON messages.user_id = users.id
              LEFT JOIN comments ON messages.id  = comments.message.id              
              LEFT JOIN users AS user_comment ON comments.user_id = user_comment.id
              WHERE messages.isActive=true 
              ORDER BY messages.id DESC;`,
        (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res)
            }
        })
};

//supprimer un message
Message.delete = (id, result) => {
    let statment = 'DELETE FROM messages WHERE id=?';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res)
    })
};

//trouver le type de réaction
Message.findReactionType = (id, result) => {
    let statment = 'SELECT * FROM reaction_type_id WHERE id=?';
    db.query(statment, id, (err, res) => {
        if (err) {
            result(err, null);
        }
        result(null, res);
    })
};

// Trouver une réction
Message.findReaction = (reaction, result) => {
    db.query(`SELECT * 
        FROM message_reaction_user
        WHERE message_id=?
        AND user_id=?`, [reaction.message_id, reaction.user_id], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

//Trouver toutes les réactions

Message.findAllReaction = (result) => {
    let statment = 'SELECT message_id, reaction_id, COUNT(*) AS sumReaction FROM message_reaction_user GROUP BY message_id, reaction_id ORDER BY message_id DESC';
    db.query(statment, (err, res) => {
        if (err) {
            result(err, null);
        }
        result(null, res);
    })
};

//Ajouter une réaction
Message.addReaction = (newReaction, result) => {
    let statment = 'INSERT INTO message_reaction_user SET ?';
    db.query(statment, newReaction, (err, res) => {
        if (err) {
            console.log('Erreur');
            result(err, null);
        }
        result(null, null);
    })
};

//Modifier la réaction d'un message
Message.updateReaction = (newReaction, result) => {
    db.query(`UPDATE message_reaction_user
              SET reaction_id=?
              WHERE message_id=?
              AND user_id=?`, [newReaction.reaction_id, newReaction.message_id, newReaction.user_id], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })


};
module.exports = Message;