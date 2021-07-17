//Importation de la contrainte du mot de passe
const passwordSchema = require('../constraints/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { //si mot de passe entré par l'utilisateur différent de celui attendu par la règle de sécurité, affiche un message d'erreur 
        console.log('Votre essai de mot de passe est trop simple !');
        return res.status(400).json({ error: 'Le mot de passe doit contenir entre 8 et 100 caractères avec au minimum une majuscule, une minuscule et deux chiffres sans espaces' });
    }
    next();
}