const jwt = require('jsonwebtoken');
const Utils = function() {

};

Utils.getSqlDate = () => {
    let date = new Date(); //Définir la date
    const dateStr = // constante dateStr
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" + //Obtenir le mois de l'année
        ("00" + date.getDate()).slice(-2) + " " + //Obtenir une date
        ("00" + date.getHours()).slice(-2) + ":" + //Obtenir l'heure
        ("00" + date.getMinutes()).slice(-2) + ":" + //Obtenir les minutes
        ("00" + date.getSeconds()).slice(-2); //Obtenir les secondes
    return dateStr;
};
// On récupère les infos du token
Utils.getReqToken = (req) => {
    const token = req.headers.authorization.split(' ')[1]; // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décodage du token
    return decodedToken;
}

module.exports = Utils;