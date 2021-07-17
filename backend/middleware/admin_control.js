//Middleware d'authentification

//package jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //recupérer le token dans le header d'autorisation
    const token = req.headers.authorization.split(' ')[1];

    //decoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const role = decodedToken.isAdmin;

    if (role == 1) {
        next();

    } else {
        return res.status(400).json({ message: 'Vous n\'êtes pas l\'administrateur et pas autorisé à faire cette action !' });
    }
};