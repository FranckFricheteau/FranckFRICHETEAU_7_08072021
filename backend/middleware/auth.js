//Middleware d'authentification

//package jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //recupérer le token dans le header d'autorisation
        const token = req.headers.authorization.split(' ')[1];

        //decoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        //extraire cette vérification
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valide !';

        } else {
            next();
        }

    } catch {
        res.status(401).json({
            error: new Error('Requête non identifiée')
        });
    }
};