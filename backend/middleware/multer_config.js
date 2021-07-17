//Importation de multer
const multer = require('multer');

//dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


//Crée un objet de configuration pour multer
//la fonction diskStorage de multer enregistre sur le disque
const storage = multer.diskStorage({
    // destination va expliquer a multer dans quel dossier enregistrer les fichiers c'est une fonction qui prend 3 arguments, req file et callback
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //le deuxieme argument est filename cela explique quel nom est utilisé a multer donc fonction a 3 arguments
    filename: (req, file, callback) => {
        //Il est possible davoir des espaces dans le nom du fichier, élimination des espaces et sont remplacés par des _ avec la methode split et .join
        const name = file.originalname.split(' ').join('_');
        //Appliquer une extension au fichier donc retour a la ligne 6 pour crée les extensions
        const extension = MIME_TYPES[file.mimetype];

        //Appel de la callback, création du file name entier donc le name du dessus + date.now + un point + l'extension du fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Fichier unique, fichier images uniquement
module.exports = multer({ storage: storage }).single('image');